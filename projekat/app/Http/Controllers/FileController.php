<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\File;

class FileController extends Controller
{
    
    public function upload(Request $request)
    {
        try{

            if ($request->hasFile('file') && $request->file('file')->isValid()) {
                $file = $request->file('file');
                $originalName = $file->getClientOriginalName();
                $mimeType = $file->getMimeType();
    
                if ($mimeType == 'application/pdf') {
                    $path = $file->store('uploads'); // Folder 'uploads' će se automatski kreirati
    
                    // Sačuvaj informacije o datoteci u bazi
                    File::create([
                        'filename' => $originalName,
                        'filepath' => $path,
                    ]);
    
                    return response()->json(['path' => $path, 'originalName' => $originalName], 200);
                } else {
                    return response()->json(['error' => 'Invalid file type'], 400);
                }
            }
        }catch (\Exception $e) {
            // Logujte izuzetak
            \Log::error($e);
    
            return response()->json(['error' => 'Internal Server Error'], 500);
        }

        return response()->json(['error' => 'Invalid file or no file provided'], 400);
    }
    

    public function getFiles()
    {
        // Dohvati informacije o datotekama iz baze podataka
        $files = File::all();
        return response()->json($files);
    }
}

