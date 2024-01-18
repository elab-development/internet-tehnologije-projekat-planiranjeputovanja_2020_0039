<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\City;

class CityController extends Controller
{
 

    public function index()
    {
        $cities = City::all();
        return response()->json($cities, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'country_id' => 'required|integer'
        ]);

        $city = City::create([
            'name' => $request->input('name'),
            'country_id' => $request->input('country_id')
        ]);

        return response()->json(['data' => $city], 201);
    }

    public function show(string $id)
    {
        $city = City::findOrFail($id);
        return response()->json(['data' => $city], 200);
    }

    public function update(Request $request, string $id)
    {
        $city = City::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'country_id' => 'required|integer'
        ]);

        $city->update([
            'name' => $request->input('name'),
            'country_id' => $request->input('country_id')
        ]);

        return response()->json(['data' => $city], 200);
    }

    public function destroy(string $id)
    {
        $city = City::findOrFail($id);
        $city->delete();

        return response()->json(['message' => 'City deleted successfully'], 200);
    }


    public function getCitiesByCountry($countryId)
{
    $cities = City::where('country_id', $countryId)->get();
    return response()->json($cities, 200);

}

}
