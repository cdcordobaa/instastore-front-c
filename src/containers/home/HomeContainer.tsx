import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomeView from "./HomeView";

interface IHomeProps {}

const HomeContainer = ({}: IHomeProps) => {
  const dispatch = useDispatch();

  return <HomeView data="hi"></HomeView>;
};

export default HomeContainer;
