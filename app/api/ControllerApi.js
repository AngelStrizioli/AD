const createData = (item, idArray) => {
  //console.log("entreCreate Data",idArray)
  //console.log("item", item);
  const baseURLImg = "https://image.tmdb.org/t/p/w200";

  return {
    id: item.id,
    imagen: `${baseURLImg}${item.poster_path}`,
    title: item.title,
    release: item.release_date,
  };
};

export const getEstrenos = async function () {
  //Parametros de conexion
  const url = "https://api.themoviedb.org/3/discover/movie?api_key=";
  const discover =
    "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
  const apiKEY = "af158ebf42ce4f8e554bcd0ba82df8dc";

  const endpoint = `${url}${apiKEY}${discover}`;
  //console.log("Buscando",endpoint);
  let resultado = await fetch(endpoint);
  //console.log("resultado",resultado);
  let rtaApi = await resultado.json();
  //console.log("respuesta bruta",rtaApi);
  //Obtengo estrenos
  const estrenos = rtaApi.results;
  console.log("Resultados", estrenos);
  //Dar formato a los datos para mostrar en la grilla
  let estrenosAMostrar = [];
  let i;
  for (i = 0; i < estrenos.length; i++) {
    estrenosAMostrar.push(createData(estrenos[i], i));
  }
  console.log(estrenosAMostrar);
  return estrenosAMostrar;
};

export const find = async function (search) {
  //Parametros de conexion
  if (search !== "") {
    const url = "https://api.themoviedb.org/3/search/movie?api_key=";
    const discover =
      "&language=en-US&query=&query=" + search + "&page=1&include_adult=false";
    const apiKEY = "af158ebf42ce4f8e554bcd0ba82df8dc";
    //&page=1
    const endpoint = `${url}${apiKEY}${discover}`;
    //console.log("Buscando",endpoint);
    let resultado = await fetch(endpoint);
    //console.log("resultado",resultado);
    let rtaApi = await resultado.json();
    //console.log("respuesta bruta",rtaApi);
    //Obtengo estrenos
    const estrenos = rtaApi.results;
    // console.log("Resultados", estrenos);
    //Dar formato a los datos para mostrar en la grilla
    let estrenosAMostrar = [];
    let i;
    for (i = 0; i < estrenos.length; i++) {
      estrenosAMostrar.push(createData(estrenos[i], i));
    }
    if (estrenosAMostrar.length > 0) {
      return estrenosAMostrar;
    } else {
      return -1;
    }
  } else {
    console.log("No hago nada");
  }
};
