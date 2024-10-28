// The function that is orderly called when the fetch button is clicked after entering a Pokémon. 
// It does a number of things. It first uses the DOM and has placeholders for all things HTML related.
// With this it checks if the Pokémon is valid, if it is, it displays the information about the Pokémon
// by scraping data from the RESTful API, PokeApi. It presents it cleanly by setting the DOM collected components
// and assigning them with the PokeApi collected data. 
async function fetchData()
{
  // Various variables that link the HTML to the dynamic JavaScript usage. 
  // These variables can now be manipulated and updated.
  // Components displayed of the document include the Pokémon's name (entered by user), sprite area, area for image citations, 
  // id number, full name, cool name, type, height, weight, and description.
  const pokemonName = document.getElementById("pokemonName").value.toLowerCase();

  const pokemonImgElement = document.getElementById("pokemonSprite");

  // Citations is initially set to hidden
  const smallReferenceText = document.getElementById("smallReferenceText");
  smallReferenceText.textContent = "";
  smallReferenceText.style.display = "hidden";



  const pokemonId = document.getElementById("pokemonId");
  const pokemonFullName = document.getElementById("pokemonFullName");
  const coolDescription = document.getElementById("coolDescription");
  const typeDisplay = document.getElementById("typeDisplay");
  const heightDisplay = document.getElementById("heightDisplay");
  const weightDisplay = document.getElementById("weightDisplay");
  const fullDescription = document.getElementById("fullDescription");

  // External Pokémon that needed to be brought since api does not support every Pokémon.
  // Checks if the name inputted was one of the following, then displays the information manually.
  // Credit is also given to the owner of the image.
  if (pokemonName === "zygarde" || pokemonName === "deoxys" || pokemonName === "farfetch'd")
  {
    pokemonImgElement.src = pokemonName + ".png";
    pokemonImgElement.style.display = "block";


    switch (pokemonName)
    {

      case "zygarde":

        smallReferenceText.textContent = "Image Artwork from Pokémon Database";


        smallReferenceText.style.display = "block";


        pokemonId.textContent = "No. 0718: ";
        pokemonFullName.textContent = "Zygarde";
        coolDescription.textContent = "Order Pokémon";
        typeDisplay.textContent = "TYPE: Ground & Dragon";
        heightDisplay.textContent = "HEIGHT: 16'05\"";
        weightDisplay.textContent = "WEIGHT: 672.4 lbs.";
        fullDescription.textContent = "It's hypothesized that it's monitoring those who destroy the ecosystem from deep in the cave where it lives."
        break;
      case "deoxys":
        smallReferenceText.textContent = "Image Artwork by kattenkg and xillo";


        smallReferenceText.style.display = "block";


        pokemonId.textContent = "No. 0386: ";
        pokemonFullName.textContent = "Deoxys";
        coolDescription.textContent = "DNA Pokémon";
        typeDisplay.textContent = "TYPE: Psychic";
        heightDisplay.textContent = "HEIGHT: 5'07\"";
        weightDisplay.textContent = "WEIGHT: 134.0 lbs.";
        fullDescription.textContent = "The DNA of a space virus underwent a sudden mutation upon exposure to a laser beam and resulted in Deoxys. The crystalline organ on this Pokémon’s chest appears to be its brain.";
        break;
      case "farfetch'd":

        smallReferenceText.textContent = "Image Artwork from Pokémon Database";


        smallReferenceText.style.display = "block";


        pokemonId.textContent = "No. 0083: ";
        pokemonFullName.textContent = "Farfetch'd";
        coolDescription.textContent = "Wild Duck Pokémon";
        typeDisplay.textContent = "TYPE: Normal & Flying";
        heightDisplay.textContent = "HEIGHT: 2'07\"";
        weightDisplay.textContent = "WEIGHT: 33.1 lbs.";
        fullDescription.textContent = "It can’t live without the stalk it holds. That’s why it defends the stalk from attackers with its life.";
        break;
    }

  }
  else
  {
    // If the Pokémon name is supported it is fetched from the PokeApi, and data is scraped and put together to
    // form a nice display on the web app.
    try
    {


      const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName);

      // Checks if the data from the PokeApi is legitimate
      if (!response.ok)
      {
        throw new Error("Please input a valid pokemon, if you catch a mistake please send email to akshaykollur08@gmail.com");
      }



      const data = await response.json();
      const pokemonSprite = data.sprites.front_default;

      const pokemonIdData = data.id.toString().padStart(4, 0);

      let pokemonNameData = data.name;
      pokemonNameData = pokemonNameData.substring(0, 1).toUpperCase() + pokemonNameData.substring(1);

      let pokemonCoolDescription = "";


      let pokemonType = "";

      let typesArray = data.types;


      let types = [];


      typesArray.forEach(element =>
      {
        let type = element.type.name;
        type = type.substring(0, 1).toUpperCase() + type.substring(1);
        types.push(type);
      }
      );


      pokemonType = types.join(" & ");


      let pokemonHeight = (data.height / 10) * 3.2808;
      const pokemonFeet = Math.trunc(pokemonHeight);



      let pokemonInches = (pokemonHeight - pokemonFeet) * 12;

      pokemonInches = Math.round(pokemonInches);


      pokemonHeight = pokemonFeet.toString() + "' " + pokemonInches.toString() + "\"";


      let pokemonWeight = data.weight * 100;




      pokemonWeight = pokemonWeight / 453.592;


      pokemonWeight = Math.round(pokemonWeight);

      pokemonWeight = pokemonWeight.toString() + " LBS"


      let pokemonFullDescription = "";



      // Another sub data set of the data file needed to be located.
      // The speciesData is specifically for the cool name and description
      const speciesResponse = await fetch(data.species.url);
      const speciesData = await speciesResponse.json();



      // For loop for both the cool name and description of the Pokémon that assigns the specified data to
      // an entry in the language of English.
      for (let entry of speciesData.genera)
      {
        if (entry.language.name === "en")
        {
          pokemonCoolDescription = entry.genus;

          break;
        }
      }



      for (let entry of speciesData.flavor_text_entries)
      {
        if (entry.language.name === "en")
        {
          pokemonFullDescription = entry.flavor_text;

          break;
        }
      }



      // Assignment of variables from the document with data scraped and collected from the RESTful PokeApi.
      //? Next implementation, make this into an update function...
      pokemonImgElement.src = pokemonSprite;
      pokemonImgElement.style.display = "block";

      pokemonId.textContent = "No. " + pokemonIdData + ": ";
      pokemonFullName.textContent = pokemonNameData;

      coolDescription.textContent = pokemonCoolDescription;

      typeDisplay.textContent = "TYPE: " + pokemonType;

      heightDisplay.textContent = "HEIGHT: " + pokemonHeight;

      weightDisplay.textContent = "WEIGHT: " + pokemonWeight;

      fullDescription.textContent = pokemonFullDescription;

    }
    catch (error)
    {
      // If something goes wrong, Pokémon not found, spelling mistake, etc. 
      // An error is thrown and the document becomes full of question marks, including the sprite area.
      console.log(error);
      pokemonImgElement.src = "question.webp";
      pokemonImgElement.style.display = "block";



      smallReferenceText.textContent = "";
      smallReferenceText.style.display = "hidden";

      pokemonId.textContent = "No. ????: "
      pokemonFullName.textContent = "????";
      coolDescription.textContent = "????";
      typeDisplay.textContent = "TYPE: ????";
      heightDisplay.textContent = "HEIGHT: ????";
      weightDisplay.textContent = "WEIGHT: ????";
      fullDescription.textContent = "????";




    }
  }
}



// The same concept of the fetchData() function but allows the user to additionally
// if needed use the "Enter" and "Delete" buttons to complete actions. Increases functionality and cases of the web app.
document.addEventListener("keydown", async (event) =>
{

  // Initial variables for document are grabbed.
  let pokemonName = document.getElementById("pokemonName");

  const pokemonImgElement = document.getElementById("pokemonSprite");

  const smallReferenceText = document.getElementById("smallReferenceText");
  smallReferenceText.textContent = "";
  smallReferenceText.style.display = "hidden";




  const pokemonId = document.getElementById("pokemonId");
  const pokemonFullName = document.getElementById("pokemonFullName");
  const coolDescription = document.getElementById("coolDescription");
  const typeDisplay = document.getElementById("typeDisplay");
  const heightDisplay = document.getElementById("heightDisplay");
  const weightDisplay = document.getElementById("weightDisplay");
  const fullDescription = document.getElementById("fullDescription");

  // If the "Enter" key is pressed then the fetchData() function partial code is run
  if (event.key === "Enter")
  {


    pokemonName = document.getElementById("pokemonName").value.toLowerCase();


    // External Pokémon that needed to be brought since api does not support every Pokémon.
    // Checks if the name inputted was one of the following, then displays the information manually.
    // Credit is also given to the owner of the image.
    if (pokemonName === "zygarde" || pokemonName === "deoxys" || pokemonName === "farfetch'd")
    {
      pokemonImgElement.src = pokemonName + ".png";
      pokemonImgElement.style.display = "block";


      switch (pokemonName)
      {

        case "zygarde":

          smallReferenceText.textContent = "Image Artwork from Pokémon Database";


          smallReferenceText.style.display = "block";


          pokemonId.textContent = "No. 0718: ";
          pokemonFullName.textContent = "Zygarde";
          coolDescription.textContent = "Order Pokémon";
          typeDisplay.textContent = "TYPE: Ground & Dragon";
          heightDisplay.textContent = "HEIGHT: 16'05\"";
          weightDisplay.textContent = "WEIGHT: 672.4 lbs.";
          fullDescription.textContent = "It's hypothesized that it's monitoring those who destroy the ecosystem from deep in the cave where it lives."
          break;
        case "deoxys":
          smallReferenceText.textContent = "Image Artwork by kattenkg and xillo";


          smallReferenceText.style.display = "block";


          pokemonId.textContent = "No. 0386: ";
          pokemonFullName.textContent = "Deoxys";
          coolDescription.textContent = "DNA Pokémon";
          typeDisplay.textContent = "TYPE: Psychic";
          heightDisplay.textContent = "HEIGHT: 5'07\"";
          weightDisplay.textContent = "WEIGHT: 134.0 lbs.";
          fullDescription.textContent = "The DNA of a space virus underwent a sudden mutation upon exposure to a laser beam and resulted in Deoxys. The crystalline organ on this Pokémon’s chest appears to be its brain.";
          break;
        case "farfetch'd":

          smallReferenceText.textContent = "Image Artwork from Pokémon Database";


          smallReferenceText.style.display = "block";


          pokemonId.textContent = "No. 0083: ";
          pokemonFullName.textContent = "Farfetch'd";
          coolDescription.textContent = "Wild Duck Pokémon";
          typeDisplay.textContent = "TYPE: Normal & Flying";
          heightDisplay.textContent = "HEIGHT: 2'07\"";
          weightDisplay.textContent = "WEIGHT: 33.1 lbs.";
          fullDescription.textContent = "It can’t live without the stalk it holds. That’s why it defends the stalk from attackers with its life.";
          break;
      }

    }
    else
    {
      // If the Pokémon name is supported it is fetched from the PokeApi, and data is scraped and put together to
      // form a nice display on the web app.
      try
      {


        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName);


        if (!response.ok)
        {
          throw new Error(
            "Please input a valid pokemon, if you catch a mistake please send email to akshaykollur08@gmail.com");
        }



        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;

        const pokemonIdData = data.id.toString().padStart(4, 0);

        let pokemonNameData = data.name;
        pokemonNameData = pokemonNameData.substring(0, 1).toUpperCase() + pokemonNameData.substring(1);

        let pokemonCoolDescription = "";

        let pokemonType = "";
        let typesArray = data.types;


        let types = [];


        typesArray.forEach(element =>
        {
          let type = element.type.name;
          type = type.substring(0, 1).toUpperCase() + type.substring(1);
          types.push(type);
        }
        );

        pokemonType = types.join(" & ");


        let pokemonHeight = (data.height / 10) * 3.2808;
        const pokemonFeet = Math.trunc(pokemonHeight);



        let pokemonInches = (pokemonHeight - pokemonFeet) * 12;

        pokemonInches = Math.round(pokemonInches);


        pokemonHeight = pokemonFeet.toString() + "' " + pokemonInches.toString() + "\"";


        let pokemonWeight = data.weight * 100;




        pokemonWeight = pokemonWeight / 453.592;


        pokemonWeight = Math.round(pokemonWeight);

        pokemonWeight = pokemonWeight.toString() + " LBS"


        let pokemonFullDescription = "";




        // Another sub data set of the data file needed to be located.
        // The speciesData is specifically for the cool name and description
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();



        // For loop for both the cool name and description of the Pokémon that assigns the specified data to
        // an entry in the language of English.
        for (let entry of speciesData.genera)
        {
          if (entry.language.name === "en")
          {
            pokemonCoolDescription = entry.genus;

            break;
          }
        }



        for (let entry of speciesData.flavor_text_entries)
        {
          if (entry.language.name === "en")
          {
            pokemonFullDescription = entry.flavor_text;

            break;
          }
        }



        // Assignment of document variables to be displayed with the Pokémon data on screen.
        pokemonImgElement.src = pokemonSprite;
        pokemonImgElement.style.display = "block";

        pokemonId.textContent = "No. " + pokemonIdData + ": ";
        pokemonFullName.textContent = pokemonNameData;

        coolDescription.textContent = pokemonCoolDescription;

        typeDisplay.textContent = "TYPE: " + pokemonType;

        heightDisplay.textContent = "HEIGHT: " + pokemonHeight;

        weightDisplay.textContent = "WEIGHT: " + pokemonWeight;

        fullDescription.textContent = pokemonFullDescription;

      }
      catch (error)
      {
        // If any problems arise, the screen gets question marks displayed.
        console.log(error);
        pokemonImgElement.src = "question.webp";
        pokemonImgElement.style.display = "block";



        smallReferenceText.textContent = "";
        smallReferenceText.style.display = "hidden";

        pokemonId.textContent = "No. ????: "
        pokemonFullName.textContent = "????";
        coolDescription.textContent = "????";
        typeDisplay.textContent = "TYPE: ????";
        heightDisplay.textContent = "HEIGHT: ????";
        weightDisplay.textContent = "WEIGHT: ????";
        fullDescription.textContent = "????";

        pokemonImgElement.src = "question.webp";
        pokemonImgElement.style.display = "block";

      }
    }
  }
  // When the "Delete" key is pressed down, the user's input box gets cleared and essentially reloads/resets the 
  // web app. 
  else if (event.key === "Delete")
  {

    event.preventDefault();



    pokemonName.value = "";

    smallReferenceText.textContent = "";
    smallReferenceText.style.display = "hidden";

    pokemonId.textContent = "No. ????: "
    pokemonFullName.textContent = "????";
    coolDescription.textContent = "????";
    typeDisplay.textContent = "TYPE: ????";
    heightDisplay.textContent = "HEIGHT: ????";
    weightDisplay.textContent = "WEIGHT: ????";
    fullDescription.textContent = "????";

    pokemonImgElement.src = "question.webp";
    pokemonImgElement.style.display = "block";
  }
}
);






