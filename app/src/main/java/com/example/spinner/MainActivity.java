package com.example.spinner;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;


public class MainActivity extends AppCompatActivity {
    public static final String EXTRA_MESSAGE = "medication";
    Spinner sp = (Spinner) findViewById(R.id.spinner1);
    Button button = (Button) findViewById(R.id.button);
    View v;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        // Get a reference to the AutoCompleteTextView in the layout

        AutoCompleteTextView textView = (AutoCompleteTextView) findViewById(R.id.autocomplete_insurance);
// Get the string array
        String[] insurance = getResources().getStringArray(R.array.insurance_array);
// Create the adapter and set it to the AutoCompleteTextView
        ArrayAdapter<String> adapter =
                new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, insurance);
        textView.setAdapter(adapter);
        Spinner mySpinner = (Spinner) findViewById(R.id.spinner1);
        Button myButton = (Button) findViewById(R.id.button);

        ArrayAdapter<String> myAdapter = new ArrayAdapter<String>(MainActivity.this,
                android.R.layout.simple_list_item_1,getResources().getStringArray(R.array.medication));
        myAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        mySpinner.setAdapter(myAdapter);

    }

    public void sendMessage(View v) {

/*
        String val = sp.getSelectedItem().toString();

        String medication;
        if (val.equalsIgnoreCase("ICS"))
            medication = "ICS";
        else if (val.equalsIgnoreCase("ICS LABA"))
            medication = "ICS_LABA";
        if (EXTRA_MESSAGE.length() > 0) {*/
            // Intent browse
            Intent intent = new Intent(this, DisplayMessageActivity.class);
            EditText editText = (EditText) findViewById(R.id.editTextTextInsurance);
            String message = editText.getText().toString();
            intent.putExtra(EXTRA_MESSAGE, message);
            startActivity(intent);

        }
    }