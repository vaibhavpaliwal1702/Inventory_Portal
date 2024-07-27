import React, { useEffect, useState } from "react";
import { getItemDetail } from "../Info/Item";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
  const data = await getItemDetail(params.id);
  return data;
}

const Item = () => {
  const temp = useLoaderData();
  const [data, setData] = useState([]);
  const [err, setErr] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(temp[0]);
      } catch (error) {
        setErr(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <p>{data.id}</p>
    </>
  );
};

export default Item;
