<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Auth\Access\Response;
use Illuminate\Http\Request;
//use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\DB;


class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */



    public function index()
    {
        $post = DB::table('posts')->select('id', 'title', 'content')->get();
        return $post;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $title = $request->title;
        $content = $request->content;
        $post = Post::Create([
            'title' => $title,
            'content' => $content,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
//     *
//     * @param int $id
//     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $id = $request->id;
        $post = Post::where('id', $id);
        return $post->select('id', 'title', 'content')->get ();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
//     * @param \Illuminate\Http\Request $request
//     * @param int $id
//     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $id = $request->id;
        $title = $request->title;
        $content = $request->content;
        $post = Post::find($id);
        $post->update([
            'title' => $title,
            'content' => $content,
        ]);
        return "Update!";
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $id = $request->id;
        $post = Post::find($id);
        $post->delete();
    }
//    public function delete(Response $id)
//    {
//        Posts::softDelete($id);
//        return redirect(url('gleb.dev.local'));
//    }
}
