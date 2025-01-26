<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Common\Collections\Criteria;
use App\Entity\User;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Knp\Component\Pager\PaginatorInterface;

final class DashboardController extends AbstractController
{
    #[Route('/dashboard', name: 'app_dashboard', methods:['GET'])]
    public function index(UserRepository $userRepository, PaginatorInterface $paginator, Request $request): Response
    {       
        $user_param = $request->query->get('user');
        
        $criteria = Criteria::create()->orderBy(['lastLogin' => Criteria::DESC]);

        $users = $userRepository->matching($criteria);

        if($user_param != null) {
            $priorityUser = $userRepository->find($user_param);
            $filteredUsers = $users->filter(function ($user) use ($user_param) {
                return $user->getId() != $user_param;
            });
            $users = array_merge([$priorityUser], $filteredUsers->toArray());
        }

        $pagination = $paginator->paginate(
            $users,
            $request->query->getInt('page', 1),
            4
        );
        
        return $this->render('dashboard/index.html.twig', [
            'users' => $users,
            'pagination'=>$pagination,
            'selected_user' => $user_param
        ]);
    }

    #[Route('/dashboard', name: 'dashboard_action', methods: ['POST'])]
    public function action(Request $request, EntityManagerInterface $entityManager) {
        $data = $request->request->all();
        $action = $data['action'];
        $userIds = $data['users'];
        if(!$userIds) {
            return $this->redirectToRoute('app_dashboard');
        }

        if ($action == 'block') {
            foreach ($userIds as $userId) {
                $user = $entityManager->getRepository(User::class)->find($userId);
                if($user) {
                    $user->setIsBlocked(true);
                }
            }
            $entityManager->flush();
        } else if($action == 'unblock') {
            foreach ($userIds as $userId) {
                $user = $entityManager->getRepository(User::class)->find($userId);
                if($user) {
                    $user->setIsBlocked(false);
                }
            }
            $entityManager->flush();
        }else if($action == 'delete') {
            foreach ($userIds as $userId) {
                $user = $entityManager->getRepository(User::class)->find($userId);
                $entityManager->remove($user);
            }
            $entityManager->flush();
        };
        return $this->redirectToRoute('app_register');
    }

    #[Route('/search/users', name: 'app_search', methods: ['POST'])]
    public function search(UserRepository $userRepository, Request $request): Response
    {
        // Get the raw XML content from the request
        $xmlContent = $request->getContent();

        // Parse the XML content
        $xml = simplexml_load_string($xmlContent);

        if (!$xml || !isset($xml->term)) {
            return new Response('Invalid XML payload', Response::HTTP_BAD_REQUEST);
        }

        $searchTerm = (string) $xml->term;
        
        // Query the database for users matching the search term
        $users = $userRepository->createQueryBuilder('u')
            ->where('u.email LIKE :term OR u.fullName LIKE :term')
            ->setParameter('term', '%' . $searchTerm . '%')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult();

        // Format the results
        $results = [];
        foreach ($users as $user) {
            $results[] = [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'fullname' => $user->getFullname(),
            ];
        }


        // Return a JSON response
        return new Response(
            json_encode($results),
            Response::HTTP_OK,
            ['Content-Type' => 'application/json']
        );
    }
}
