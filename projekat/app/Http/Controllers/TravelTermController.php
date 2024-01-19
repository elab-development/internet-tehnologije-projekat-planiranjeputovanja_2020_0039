<?php

namespace App\Http\Controllers;
use App\Models\TravelTerm;

use Illuminate\Http\Request;

class TravelTermController extends Controller
{
    public function index($cityId)
    {
        $travelTerms = TravelTerm::where('city_id', $cityId)->get();

        return response()->json($travelTerms);
    }


    public function store(Request $request)
    {
        /*$request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'city_id' => 'required|exists:cities,id',
            'country_id' => 'required|exists:countries,id',
        ]);*/

        $request->validate([
            'start_date' => 'required|date_format:Y-m-d',
            'end_date' => 'required|date_format:Y-m-d',
            'city_id' => 'required|exists:cities,id',
            'country_id' => 'required|exists:countries,id',
        ]);

        $travelTerm = TravelTerm::create($request->all());

        return response()->json(['travel_term' => $travelTerm], 201);
    }

   
    public function show(string $id)
    {
        $travelTerm = TravelTerm::with(['city', 'country'])->findOrFail($id);
        return response()->json(['travel_term' => $travelTerm]);
    }

   
    public function update(Request $request, string $id)
    {
        $travelTerm = TravelTerm::findOrFail($id);

        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'city_id' => 'required|exists:cities,id',
            'country_id' => 'required|exists:countries,id',
        ]);

        $travelTerm->update($request->all());

        return response()->json(['travel_term' => $travelTerm]);
    }

   
    public function destroy(string $id)
    {
        $travelTerm = TravelTerm::findOrFail($id);
        $travelTerm->delete();

        return response()->json(['message' => 'Travel term successfully deleted']);
    }
}

