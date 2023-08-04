<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use App\Entity\Admin;
use App\Entity\Client;
use App\Entity\Panier;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;

/**
* @Route("/user", name="app_user.")
*/
class UserController extends AbstractController
{
    /**
     * @Route("/search/{id}/{pd}", name="search", methods="GET")
     */
    public function search(UserRepository $ur,$id,$pd,UserPasswordEncoderInterface $upei): Response
    {
        $u=$ur->findOneBy(["username"=>$id]);
        if($u==null)
            return new Response("user not found");
        if ($upei->isPasswordValid($u, $pd)) 
            return new Response("user found");
        return new Response("user not found");
    }
    /**
     * @Route("/{username}/edit", name="_edit", methods={"PUT"})
     */
    public function edit(Admin $u,EntityManagerInterface $em,Request $req,UserPasswordEncoderInterface $upei): Response
    {
        $data=json_decode($req->getContent(),true);
        $u->setUsername($data["username"]);
        $u->setLastname($data["lastname"]);
        $u->setPassword($upei->encodePassword($u,$data["password"]));
        $em->persist($u);
        $em->flush();
        return new Response("user created successfully");
    }
    /**
     * @Route("/create", name="create", methods={"GET", "POST"})
     */
    public function create(EntityManagerInterface $em,Request $req,UserPasswordEncoderInterface $upei): Response
    {
        $data=json_decode($req->getContent(),true);
        $req->request->replace($data);
        $u=new User();
        $u->setUsername($req->get("username"));
        $u->setRoles($req->get("roles"));
        $u->setPassword($upei->encodePassword($u,$req->get("password")));
        $em->persist($u);
        $em->flush();
        return new Response("user created successfully");
    }

    /**
     * @Route("/create/admin", name="create.admin", methods={"GET", "POST"})
     */
    public function createAdmin(EntityManagerInterface $em,Request $req,UserPasswordEncoderInterface $upei): Response
    {
        $data=json_decode($req->getContent(),true);
        $req->request->replace($data);
        $a=new Admin();
        $a->setUsername($req->get("username"));
        $a->setRoles($req->get("roles"));
        $a->setPassword($upei->encodePassword($a,$req->get("password")));
        $a->setLastname($req->get("lastname"));
        $em->persist($a);
        $em->flush();
        return new Response("user created successfully");
    }
    /**
     * @Route("/create/client", name="create.client", methods={"GET", "POST"})
     */
    public function createClient(EntityManagerInterface $em,Request $req,UserPasswordEncoderInterface $upei): Response
    {
        $data=json_decode($req->getContent(),true);
        $req->request->replace($data);
        $a=new Client();
        $a->setUsername($req->get("username"));
        $a->setRoles($req->get("roles"));
        $a->setPassword($upei->encodePassword($a,$req->get("password")));
        $a->setFirstname($req->get("firstname"));
        $p=new Panier();
        $p->setClient($a);
        $em->persist($a);
        $em->persist($p);
        $em->flush();
        return new Response("user created successfully");
    }
}
