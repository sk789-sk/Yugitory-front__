import React, { useState } from 'react';
import {View, TextInput, Button} from 'react-native';
import {Picker} from '@react-native-picker/picker';
//Search parameters of interest:
//1. name_partial, Monster spell trap, Legal_Date
//If it is a monster that the following parameters should be enables: ATK, DEF, card_race, card attribute, effect, tuner, 
//ATK within some range, DEF within some range,  


//Given the parameters of interest the function should just return the object that only has the values of interest.
//This object is then used to create the search query, which could either be an API call or a SQL query. 
//This i think should be delegated to the function that gets the data and have the search only create the object

//Picker component has an enabled feature which can disable a picker, but won't hide it. THis only works on android/windows but not on iOS. on iOS we can only be able to interact with it or have it hidden. One workaround could be wrap these pickers in views and make the uninteractable. 


const SearchComponent = () => {
 const [nameSearch, setNameSearch] = useState('');
 const [cardType, setCardType] = useState('');
 const [filterDate, setFilterDate] = useState('');
 const [spellTrapType, setSpellTrapType] = useState('');
 const [maxAttack, setMaxAttack] = useState(99999);
 const [minAttack, setMinAttack] = useState(0);
 const [maxDefense, setMaxDefense] = useState(99999);
 const [minDefense, setMinDefense] = useState(0);
 const [maxLevel, setMaxLevel] = useState(12);
 const [minLevel, setMinLevel] = useState(0);

function createFilterObj(){
  //Create the object that will have the values selected by the user and then pass this objet to the function that will run the API call or query.
  //Should probably trigger on a search button press
  const baseFilterObj = {}
  const BaseURL= 'http://ec2-3-135-192-227.us-east-2.compute.amazonaws.com:8000/cards/getAllCards?' 

  const defaults = {
    nameSearch:'',
    cardType:'',
    filterDate:'',
    spellTrapType:'',
    maxAttack:99999,
    minAttack:0,
    maxDefense:99999,
    minDefense:0,
    minLevel:12,
    maxLevel:0,
  }
  const states = {
    nameSearch,
    cardType,
    filterDate,
    spellTrapType,
    maxAttack,
    minAttack,
    maxDefense,
    minDefense,
    minLevel,
    maxLevel
  }

  for (const key in defaults){
    if (states[key] !== defaults[key] && states[key] !== ''){ 
      baseFilterObj[key] = states[key]
    }
  }

// Need to turn the state names into the names that the API expects. Using those names for state would be confusing. 

  function adaptFilters(filter_obj){
    const mappedFilters={}
    const mapping = {
      nameSearch: 'name_partial',
      cardType: 'card_type',
      filterDate: 'legal_date',
      spellTrapType:'',
      minAttack: 'atk_is_greater',
      maxAttack: 'atk_is_less',
      spellTrapType: 'card_race'
    }

    for (const key in filter_obj){
      if (key in mapping){
        mappedFilters[mapping[key]] = filter_obj[key]
      }else{
        mappedFilters[key] = filter_obj[key]
      }
    }
    return mappedFilters
  }

  const mappedFilters = adaptFilters(baseFilterObj)

  //create URL parameters this function should be generic, need an enpoint and the filters object
  // http://ec2-3-135-192-227.us-east-2.compute.amazonaws.com:8000/cards/getAllCards? 

  function createQueryURL(baseURL, mappedFilterObj){

    searchParams= new URLSearchParams(mappedFilterObj)
    console.log(searchParams.toString())
    const queryURL = baseURL + searchParams.toString()
    return queryURL
  }

  const queryURL = createQueryURL(BaseURL, mappedFilters)
  console.log(queryURL)
  return queryURL
}

return (
    <View>
        <TextInput placeholder="Name" value={nameSearch} onChangeText={setNameSearch} />
        <Picker
          selectedValue={cardType}
          onValueChange={(itemValue) => setCardType(itemValue)}>
          <Picker.Item label="" value="" />
          <Picker.Item label="Monster" value="Monster" />
          <Picker.Item label="Spell" value="Spell" />
          <Picker.Item label="Trap" value="Trap" />
        </Picker>
        {/* <TextInput placeholder="Filter Date" value={filterDate} onChangeText={setFilterDate} /> */}
        <Picker 
          selectedValue={spellTrapType}
          onValueChange={(itemValue) => setSpellTrapType(itemValue)}>
          <Picker.Item label="" value="" />
          <Picker.Item label="Normal" value="Normal" />
          <Picker.Item label="Continous" value="Continous" />
          <Picker.Item label="Equip" value="Equip"/>
          <Picker.Item label="Quick-Play" value="Quick-Play" />
          <Picker.Item label="Field" value="Field" />
          <Picker.Item label="Ritual" value="Ritual" />
        </Picker>

        <View>
          <TextInput inputMode='numeric' returnKeyType='done' placeholder="Min_Attack" onChangeText={setMinAttack} />
          <TextInput inputMode='numeric' returnKeyType='done' placeholder="Max_Attack" onChangeText={setMaxAttack} />
        </View>
        
        <View>
          <TextInput inputMode='numeric' returnKeyType='done' placeholder="Min_Defense" onChangeText={setMinDefense} />
          <TextInput inputMode='numeric' returnKeyType='done' placeholder="Max_Defense"
          onChangeText={setMaxDefense} />
        </View>
        
        <View>
          <TextInput inputMode='numeric' returnKeyType='done' placeholder="min_Level" onChangeText={setMinLevel} />
          <TextInput inputMode='numeric' returnKeyType='done' placeholder="max_Level" onChangeText={setMaxLevel} />
        </View>
        
        <Button title="Search" onPress={createFilterObj} /> 
    </View>
  
  )};

export default SearchComponent;