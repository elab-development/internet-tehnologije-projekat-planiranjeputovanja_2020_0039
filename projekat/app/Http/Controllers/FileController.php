<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\File;

class FileController extends Controller
{
    
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:pdf,jpg,jpeg,png|max:2048',
        ]);
    
        $uploadedFile = $request->file('file');
        $path = $uploadedFile->store('app/uploads'); // Podesite prema vašim potrebama
    
        $file = File::create([
            'filename' => $uploadedFile->getClientOriginalName(),
            'path' => $path,
        ]);
    
        dd($file);
    
        return response()->json($file, 201);
    }

    public function getFiles()
    {
        // Dohvati informacije o datotekama iz baze podataka
        $files = File::all();
        return response()->json($files);
    }
}