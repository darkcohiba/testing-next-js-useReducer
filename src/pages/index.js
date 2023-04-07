import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
var array = require('lodash/array');
import { useRouter } from 'next/router';




const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps(context) {
  const res = await fetch(`https://api.adviceslip.com/advice`);
  const data = await res.json();

  const resp = await fetch(`http://localhost:4000/adviceSlips`);
  const favorites = await resp.json();

  return {
    props: {
      data,
      favorites,
    },
  };
}

export default function Home(props) {
  const router = useRouter();

  // console.log(data.slip.advice)
  useEffect(()=>{
    props.favorites.forEach((advice)=>{
      let stringToAdd = advice.advice
      dispatch({ type: 'add', stringToAdd });
    })

  },[])

  const refreshData = () => {
    router.replace(router.asPath);
  }


  const [adviceSlips, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'add':
        return [...state, action.stringToAdd];
      default:
        return state;
    }
  }, []);

  const handleAddFavorite = () => {
    const stringToAdd = props.data.slip.advice;
    dispatch({ type: 'add', stringToAdd });
    fetch('http://localhost:4000/adviceSlips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: uuidv4(),
        advice: props.data.slip.advice
      })
    })

  };

  const adviceSlipPieces = array.uniq(adviceSlips).map((slip) => {
    return <p>{slip}</p>
  })

  console.log(adviceSlipPieces)



  return (
    <>
    {props.data.slip.advice}
    <button onClick={handleAddFavorite}>Favorite Advice</button>
    <button onClick={refreshData}>Refresh Advice</button>

    <div>
      {adviceSlipPieces}
    </div>
    </>
  )
}
