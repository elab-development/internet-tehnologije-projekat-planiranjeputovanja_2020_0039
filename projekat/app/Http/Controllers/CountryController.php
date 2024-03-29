<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Country;

class CountryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $countries = Country::orderBy('name', 'asc')->get();

        return response()->json($countries,200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $country = Country::create([
            'name' => $request->input('name')
        ]);

        return response()->json(['data' => $country], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $country = Country::findOrFail($id);
        return response()->json(['data' => $country], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $country = Country::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $country->update([
            'name' => $request->input('name')
        ]);

        return response()->json(['data' => $country], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $country = Country::findOrFail($id);
        $country->delete();

        return response()->json(['message' => 'Country deleted successfully'], 200);
    }
}
