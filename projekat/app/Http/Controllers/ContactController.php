<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;


class ContactController extends Controller
{
    public function index()
    {
        $contact = Contact::all();
        return response()->json($contact, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'nullable|string',
        ]);

        Contact::create($request->all());

        return redirect()->route('contact.index')->with('success', 'Contact form submitted successfully!');
    }
}
