export async function getItemDetail(id) {
  const data = await fetch(`http://localhost:8000/data/${id}`);
  if (data) {
    return data.json();
  }
}

export async function getData() {
  const testData = await fetch("http://localhost:8000/data");
  if (!testData.ok) {
    throw new Error("Failed to fetch data");
  }
  return testData.json();
}

export async function deleteData(id) {
  try {
    const data = await fetch(`http://localhost:8000/data/${id}`, {
      method: "delete",
    });
    if (!data.ok) {
      throw new Error("Failed to delete item");
    } else {
      return true;
    }
  } catch(error) {
    console.log(error);
  }
}

export async function AddData(data) {
  try {
    const urlEncodedData = encodeURIComponent(JSON.stringify(data));
    const res = await fetch(`http://localhost:8000/add/${urlEncodedData}`);
    if (!res.ok) {
      throw new Error("Failed to Add item");
    } else {
      return true;
    }
  } catch(error) {
    console.log(error);
  }
}

export async function filterData(data){
  try{
    const urlEncodeData = encodeURIComponent(JSON.stringify(data));
    const res = await fetch(`http://localhost:8000/sort/${urlEncodeData}`);
    if(!res.ok){
      throw new error("Faild to sort items.");
    } else{
      return res.json();
    }
  }catch(error){
    return console.log(error)
  }
}