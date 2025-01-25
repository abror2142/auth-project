<?php

namespace App\EventListener;

use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\HttpFoundation\RequestStack;


final class RequestListener
{   

    private $tokenStorage;
    private UrlGeneratorInterface $urlGenerator;
    private RequestStack $requestStack;

    public function __construct(
        TokenStorageInterface $tokenStorage, 
        UrlGeneratorInterface $urlGenerator, 
        RequestStack $requestStack)
    {
        $this->tokenStorage = $tokenStorage;
        $this->urlGenerator = $urlGenerator;
        $this->requestStack = $requestStack;
    }

    #[AsEventListener(event: KernelEvents::REQUEST)]
    public function onKernelRequest(RequestEvent $event): void
    {

        $token = $this->tokenStorage->getToken();
        $request = $event->getRequest();
        $path = $request->getPathInfo();
        $excludedPaths = ['/', '/login', '/register'];

        if(!in_array($path, $excludedPaths, true) && !preg_match('/^\/_/', $path))
        {
            $url = $this->urlGenerator->generate('app_login');
            $response = new RedirectResponse($url);
            if($token){
                $user = $token->getUser();
                if($user && $user->getIsBlocked() == true) {
                    $session = $this->requestStack->getSession();
                    if (!$session->isStarted()) {
                        $session->start();
                    }
                    $session->getFlashBag()->add('error', 'Your account is blocked. Please contact support.');
                    $event->setResponse($response);
                } 
            }
        }
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::CONTROLLER => 'onKernelController',
        ];
    }
}
