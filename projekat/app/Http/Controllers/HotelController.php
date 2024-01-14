<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HotelController extends Controller
{
    public function index()
    {
        $hotels = Hotel::all();
        return response()->json(['data' => $hotels], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'city_id' => 'required|integer'
        ]);

        $hotel = Hotel::create([
            'name' => $request->input('name'),
            'address' => $request->input('address'),
            'city_id' => $request->input('city_id')
        ]);

        return response()->json(['data' => $hotel], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $hotel = Hotel::findOrFail($id);
        return response()->json(['data' => $hotel], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $hotel = Hotel::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'city_id' => 'required|integer'
        ]);

        $hotel->update([
            'name' => $request->input('name'),
            'address' => $request->input('address'),
            'city_id' => $request->input('city_id')
        ]);

        return response()->json(['data' => $hotel], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $hotel = Hotel::findOrFail($id);
        $hotel->delete();

        return response()->json(['message' => 'Hotel deleted successfully'], 200);
    }

}
