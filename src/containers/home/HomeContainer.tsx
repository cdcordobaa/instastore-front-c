import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomeView from "./HomeView";

interface IHomeProps {}

const HomeContainer = ({}: IHomeProps) => {
  const dispatch = useDispatch();

  const fakeDataOject = {
    destination: {
      name: "city", // Name of the address given by user (required)
      address: "cra 7 no 100", // Address captured (required)
      address_two: "apto", //Additional details for the address (line apt, house number, etc)
      description: "hey knock the door", //Instructions for the delivery
      country: "Colombia", // Country code according to ISO-3166-1 (required)
      city: "Bogota", // City name
      state: "Bogota", // State name
      zip_code: "11002",
      latitude: 0, //number indicating the latitude of the address provided
      longitude: 0, //number indicating the longitude of the address provided
    },
  };

  const fakeResponse = [
    {
      storeId: "25",
      storeName: "the house",
      isOpen: true,
      coordinates: {
        latitude: 1.3521,
        longitude: 103.8198,
      },
      nextDeliveryTime: 60,
    },
    {
      storeId: "26",
      storeName: "the house",
      isOpen: true,
      coordinates: {
        latitude: 1.3521,
        longitude: 103.81,
      },
      nextDeliveryTime: 60,
    },
  ];

  return <HomeView storesList={fakeResponse}></HomeView>;
};

export default HomeContainer;
