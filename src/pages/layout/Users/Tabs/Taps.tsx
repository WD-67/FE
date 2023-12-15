import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useGetCategorysQuery } from '../../../../api/category';
import { ICategory } from '../../../../interfaces/category';
import { Link } from "react-router-dom";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useEffect, useState } from 'react';

export default function CustomTabs() {
  const { data: categoryData } = useGetCategorysQuery();
  // console.log(categoryData)

  const [sliderInitialized, setSliderInitialized] = useState(false);

  useEffect(() => {
    if (categoryData?.data && !sliderInitialized) {
      setSliderInitialized(true);
    }
  }, [categoryData, sliderInitialized]);


  return (

    <div value={"Women"}>
      <div className="w-3/5 mx-auto">
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={5}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={2000}
        >
          {sliderInitialized &&
            categoryData?.data?.map((category: ICategory) => (
              <div key={category._id}>
                <Link to={`/category/${category._id}`}>
                  <img alt="" src={category.image} className="w-[150px] h-[90px]" />
                </Link>
              </div>
            ))}
        </Slider>
      </div>

    </div >

  )

}