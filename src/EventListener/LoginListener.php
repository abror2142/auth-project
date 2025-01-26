<?php

namespace App\EventListener;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\Security\Http\Event\InteractiveLoginEvent;
use Symfony\Component\HttpFoundation\RedirectResponse;


final class LoginListener
{
    #[AsEventListener(event: 'security.interactive_login')]

    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function onSecurityInteractiveLogin(InteractiveLoginEvent $event): void
    {
        $user = $event->getAuthenticationToken()->getUser();

        if ($user instanceof \App\Entity\User) {
            $user->setLastLogin(new \DateTime());
            $this->entityManager->persist($user);
            $this->entityManager->flush();
        }

        $request = $event->getRequest();

        // If the user is already logged in (by checking session or cookie)
        if ($request->getSession()) {
            // Add a flash message
            $request->getSession()->getFlashBag()->add('success', 'You are successfully logged in.');
        }
        // $event->setResponse(new RedirectResponse($this->router->generate('dashboard')));
    }
}
