<?php

namespace App\Controller;

use App\Entity\Categorie;
use App\Form\CategorieType;
use App\Repository\CategorieRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\VarDumper\VarDumper;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Filesystem\Filesystem;
use App\Repository\ArticleRepository;
use Symfony\Component\Serializer\SerializerInterface;
use App\Services\CategorieService;

/**
 * @Route("/api/categorie", name="app_categorie")
 */
class CategorieController extends AbstractController
{
    private $cs;
    public function __construct(CategorieService $cs)
    {
        $this->cs = $cs;
    }
    /**
     * @Route("/", name="_index", methods={"GET"})
     */
    public function index(): Response
    {
        return $this->cs->getCategories();
        // use Swagger\Annotations as SWG;
        // use Nelmio\ApiDocBundle\Annotation\Model;
    //  *
    //  * @SWG\Get(
    //  *     summary="Say hello",
    //  *     @SWG\Parameter(
    //  *         name="name",
    //  *         in="path",
    //  *         type="string",
    //  *         description="The name to say hello to",
    //  *         required=true,
    //  *     ),
    //  *     @SWG\Response(
    //  *         response=200,
    //  *         description="Returns a greeting message",
    //  *         @SWG\Schema(
    //  *             type="object",
    //  *             @SWG\Property(
    //  *                 property="message",
    //  *                 type="string",
    //  *                 example="Hello, John!",
    //  *             ),
    //  *         ),
    //  *     ),
    //  * )
    }

    /**
     * @Route("/{id}", name="_show", methods={"GET"})
     */
    public function show($id): Response
    {
        return $this->cs->getCategorie($id);
    }

    public function removeimage(string $image)
    {
        $filesystem = new Filesystem();
        $filesystem->remove($this->getParameter('uploads').$image);
    }

    /**
     * @Route("/new", name="_new", methods={"POST"})
     */
    public function new(Request $req): Response
    {
        $categorie = new Categorie();
        return $this->save($categorie,$req);
        // $data=json_decode($req->getContent(),true);
        // $form=$this->createForm(CategorieType::class,$categorie,array('csrf_protection'=>false));
        // $form->submit($data);
        // return $this->cs->save($categorie);
    }

    /**
     * @Route("/{id}/edit", name="_edit", methods={"PUT"})
     */
    public function edit(Categorie $categorie,Request $req): Response
    {
        return $this->save($categorie,$req);
        // $data=json_decode($req->getContent(),true);
        // $form=$this->createForm(CategorieType::class,$categorie,array('csrf_protection'=>false));
        // $form->submit($data);
        // return $this->cs->save($categorie);

    }

    public function save(Categorie $categorie,Request $req){
        $data=json_decode($req->getContent(),true);
        $delim = $data['del'];
        if($delim!=""){$this->removeimage($delim);}
        $form=$this->createForm(CategorieType::class,$categorie,array('csrf_protection'=>false));
        $form->submit($data);
        return $this->cs->save($categorie);
    }

    /**
     * @Route("/{id}", name="_delete", methods={"DELETE"})
     */
    public function delete(Categorie $e): Response
    {
        $this->removeimage($e->getImage());
        return $this->cs->deleteCategorie($e);
    }
}
