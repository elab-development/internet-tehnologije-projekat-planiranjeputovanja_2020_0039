<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attraction;

class AttractionController extends Controller
{
    
    public function getAttractionsByCity($cityId)
    {
        $attractions = Attraction::where('city_id', $cityId)->get();
        return response()->json($attractions);
    }
    


    public function index()
    {
        $attractions = Attraction::all();
        return response()->json($attractions);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'city_id' => 'required|integer',
            'country_id' => 'required|integer',
            'address' => 'required|string|max:255'
        ]);

        $attraction = Attraction::create([
            'name' => $request->input('name'),
            'city_id' => $request->input('city_id'),
            'country_id' => $request->input('country_id'),
            'address' => $request->input('address')
        ]);

        return response()->json(['data' => $attraction], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $attraction = Attraction::findOrFail($id);
        return response()->json($attraction);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $attraction = Attraction::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'city_id' => 'required|integer',
            'country_id' => 'required|integer',
            'address' => 'required|string|max:255'
        ]);

        $attraction->update([
            'name' => $request->input('name'),
            'city_id' => $request->input('city_id'),
            'country_id' => $request->input('country_id'),
            'address' => $request->input('address')
        ]);

        return response()->json(['data' => $attraction], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $attraction = Attraction::findOrFail($id);
        $attraction->delete();

        return response()->json(['message' => 'Attraction deleted successfully'], 200);
    }
}

