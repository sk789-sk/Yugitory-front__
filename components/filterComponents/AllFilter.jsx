import {React, useCallback, useState} from "react"
import {View,TouchableOpacity,Text,StyleSheet,Dimensions,Image, TextInput} from "react-native"
import MultiSlider from "@ptomasroos/react-native-multi-slider"
import TableRow from "./reusable/TableRow"
import TableRowImage from "./reusable/TableRowImage"

const AllFilter = ({filters, setFilters}) => {

    const [containerWidth, setContainerWidth] = useState(0)

    // const attributes= ["Dark","Light","Earth","Water","Fire","Wind","Divine"]
    const monstertypes = ["Spellcaster","Dragon","Zombie","Warrior","Beast-Warrior","Beast","Winged Beast","Fiend","Fairy","Insect","Dinosaur","Reptile","Fish","Sea Serpent","Aqua","Pyro","Thunder","Rock","Plant","Machine","Psychic","Divine-Beast","Wyrm","Cyberse","Illusion"]
    const spellTrapTypes = ["Equip", "Field", "Quick-Play","Ritual","Continuous","Counter","Normal"]
    const monsterCardFeatures = ["Normal","Effect","Ritual","Fusion","Synchro","Xyz","Toon","Spirit","Union","Gemini","Tuner","Flip","Pendulum","Link"]
    const levelRank = [1,2,3,4,5,6,7,8,9,10,11,12,13]
    const pendLevels = [1,2,3,4,5,6,7,8,9,10,11,12,13]

    const attributes=[ 
        {
            val:'Light',
            //'../../assets/Attribute_Test/LIGHT - Copy.png'
            source: require('../../assets/Attribute_Test/LIGHT - Copy.png'),
            
        },
        {
            val:'Dark',
            source: require('../../assets/Attribute_Test/DARK - Copy.png'),
            
        },
        {
            val:'Earth',
            source: require('../../assets/Attribute_Test/EARTH - Copy.png'),
            
        },
        {
            val:'Water',
            source: require('../../assets/Attribute_Test/WATER - Copy.png'),
            
        },
        {
            val:'Fire',
            source: require('../../assets/Attribute_Test/FIRE - Copy.png'),
            
        },
        {
            val:'Wind',
            source: require('../../assets/Attribute_Test/WIND - Copy.png'),
            
        },
        // {
        //     val:'Divine',
        //     source: require()
        // }
        ]

    //Level/Rank 0-13
    //Pend0-13
    //Link0-6
    
    const onContainerLayout = useCallback((e) => {
        const {width} = e.nativeEvent.layout;
        setContainerWidth(width)
    })


    const renderTableRow = (renderFunction,headerLabel) => {
        return (
            <View testID="tableCell" style={styles.tableCell}>
                <View testID="tableCellHeader" style={styles.tableCellHeader}>
                    <Text testID="tableCellHeaderText">{headerLabel}</Text>
                </View>
                <View testID="tableCellContent" style={[styles.tableCellContent,{backgroundColor:"orange"}]}>
                        {renderFunction()}
                </View>
            </View>
        )
    }
    const valArr = [0,0]

    const renderStatsFilter = () => {
        return (
            <View style={styles.statsContainer}>
                    <MultiSlider 
                        values = {[0,10000]}g
                        min={0}
                        max={10000}
                        step={50}
                        sliderLength={200}
                        isMarkersSeparated={true}
                        enabledTwo={true}
                        enableLabel={true}
                    />
                <View style={{flex:1, backgroundColor:"gray"}} testID="ATK">
                    <Text>Attack</Text>
                    <TextInput placeholder="0"></TextInput> 
                    <TextInput placeholder="inf"></TextInput>
                </View>
                <View style={{flex:1, backgroundColor:"white"}} testID="DEF">
                    <Text>Defense</Text>
                    <TextInput placeholder="0"></TextInput>
                    <TextInput placeholder="inf"></TextInput>
                </View>
            </View>
        )
    }

    const renderRangeSearch = () => {
        return (
            <View style={styles.statsContainer}>
                <View testID='initDate'>
                    <Text>Start Date</Text>
                    <TextInput placeholder="MMDDYY"></TextInput>
                </View>
                <View testID="endDate">
                    <Text>End Date</Text>
                    <TextInput placeholder="MMDDYY"></TextInput>
                </View>
            </View>
        )
    }
    
    const renderTableData = (filterState) => {
        switch(filterState){
            case "Monster":
                return (
                    <>
                    <TableRowImage buttonArray={attributes} headerLabel="Attributes" rowType={"attributes"} selectedValuesArr={filters["attributes"]} setFilters={setFilters} />                    
                    <TableRow buttonArray={monstertypes} headerLabel="Monster Type" rowType={"monsterTypes"} selectedValuesArr={filters["monsterTypes"]} setFilters={setFilters} />
                    <TableRow buttonArray={monsterCardFeatures} headerLabel="Monster Attributes" rowType={"monsterAttributes"} selectedValuesArr={filters["monsterAttributes"]} setFilters={setFilters} />
                    <TableRow buttonArray={levelRank} headerLabel="Level/Rank" rowType={"monsterLevelRanks"} selectedValuesArr={filters["monsterLevelRanks"]} setFilters={setFilters}/>
                    <TableRow buttonArray={levelRank} headerLabel="PendulumScales" rowType={"pendulumScales"} selectedValuesArr={filters["pendulumScales"]} setFilters={setFilters}/>

                    {renderTableRow(() => renderStatsFilter(),"Stats")}
                    {renderTableRow(()=> renderRangeSearch(),"ReleaseDate")}
                    </>
                );
            case "All":
                return (
                    <>
                    <TableRowImage buttonArray={attributes} headerLabel="Attributes" rowType={"attributes"} selectedValuesArr={filters["attributes"]} setFilters={setFilters} />
                    <TableRow buttonArray={monstertypes} headerLabel="Monster Type" rowType={"monsterTypes"} selectedValuesArr={filters["monsterTypes"]} setFilters={setFilters} />
                    <TableRow buttonArray={spellTrapTypes} headerLabel="ST-Type" rowType={"spellTrapType"} selectedValuesArr={filters["spellTrapType"]} setFilters={setFilters} />
                    <TableRow buttonArray={monsterCardFeatures} headerLabel="Monster Attributes" rowType={"monsterAttributes"} selectedValuesArr={filters["monsterAttributes"]} setFilters={setFilters} />
                    <TableRow buttonArray={levelRank} headerLabel="Level/Rank" rowType={"monsterLevelRanks"} selectedValuesArr={filters["monsterLevelRanks"]} setFilters={setFilters}/>
                    <TableRow buttonArray={levelRank} headerLabel="PendulumScales" rowType={"pendulumScales"} selectedValuesArr={filters["pendulumScales"]} setFilters={setFilters}/>
                    {renderTableRow(() => renderStatsFilter(),"Stats")}
                    {renderTableRow(()=> renderRangeSearch(),"ReleaseDate")}
                    </>
                );
            case "Spell-Trap":
                return (
                    <>
                    <TableRow buttonArray={spellTrapTypes} headerLabel="ST-Type" rowType={"spellTrapType"} selectedValuesArr={filters["spellTrapType"]} setFilters={setFilters} />
                    {renderTableRow(()=> renderRangeSearch(),"ReleaseDate")}                    
                    </>
                );
            default:
                return <>
                    <Text>Unexpected Input Resetting Filters</Text>
                </>
        }

    }

    return(
        <View style={styles.tableWrapper}>
            {renderTableData(filters['cardType'])}
            {/* <TableRow buttonArray={attributes} headerLabel="Test" rowType={"attributes"} selectedValuesArr={filters["attributes"]} setFilters={setFilters} />
            <TableRow buttonArray={monstertypes} headerLabel="test2" rowType={"cardType"} selectedValuesArr={filters["cardType"]} setFilters={setFilters} /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    tableCell:{
        flexDirection:"column",
        borderColor:"black",
        borderWidth:1
    },
    tableCellHeader:{
        alignItems:"flex-start",
        flex:1,
        backgroundColor:"yellow"
    },
    tableCellContent:{
        flex:5,
        backgroundColor:"magenta",
        gap:1
    },
    tableWrapper:{
        flexDirection:"column",
        backgroundColor:"magenta",
        rowGap:5
    },
    tableRow:{
        flexDirection:"column",
        flex:1,
        margin:5,
        flexWrap:"wrap"
    },
    tabledataCell:{
        flex:8,
        backgroundColor:"lime",
        borderWidth:1,
        borderColor:"black",
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent:"space-around"
    },
    tabledataButton:{
        backgroundColor:"silver",
        borderWidth:1,
        borderColor:"red",
        justifyContent:"center",
        alignItems:"center",
        margin:1,
    },
    buttonImage:{
        height:'100%',
        minHeight:50,
        width:50
    },
    buttonText:{
        fontSize:12
    },
    buttonContainer:{
        flexDirection:"row",
        flexWrap:"wrap",  
        backgroundColor:"white",
        margin:5
    },
    statsContainer:{
        flexDirection:"row"
    }
})

export default AllFilter

