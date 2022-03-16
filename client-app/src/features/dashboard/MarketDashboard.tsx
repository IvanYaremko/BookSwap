import _ from "lodash";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Dropdown, Grid, Search } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/Store";
import CustomSearch from "../Search/CustomSearch";
import BookList from "./BookList";

export default observer(function MarketDashboard() {
    const { bookStore, userStore } = useStore()
    const { loadBooks, bookMap, county, setCounty } = bookStore
    const { user } = userStore

    const countyDefinitions = ["Antrim", "Armagh", "Carlow", "Cavan", "Clare", "Cork", "Derry", "Donegal", "Down", "Dublin",
        "Fermanagh", "Galway", "Kerry", "Kildare", "Kilkenny", "Laois", "Leitrim", "Limerick", "Longford", "Louth", "Mayo", "Meath",
        "Monaghan", "Offaly", "Roscommon", "Sligo", "Tipperary", "Tyrone", "Waterford", "Westmeath", "Wexford", "Wicklow",]

    const countyOptions = _.map(countyDefinitions, (county, index) => ({
        key: countyDefinitions[index],
        text: county,
        value: countyDefinitions[index],
    }))

    function handleDropDown(event:any, data:any) {
        setCounty(data.value)
    }

    useEffect(() => {
        if (bookMap.size <= 1) loadBooks()
        if (county == undefined) setCounty(user?.county!)
    }, [bookMap.size, loadBooks])




    if (bookStore.loadingInitial) return <LoadingComponent content='Loading Books' />

    return (
        <>
            <Grid centered>
                <Grid.Column width='10' >
                    <Grid.Row>
                        <CustomSearch />

                    </Grid.Row>
                    <Dropdown name='county' placeholder="County" search selection options={countyOptions} onChange={handleDropDown} defaultValue={county}/>
                    <BookList />
                </Grid.Column>
            </Grid>
        </>
    )
})