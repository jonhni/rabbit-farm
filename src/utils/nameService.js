const rabbits = [
"Wadim",
"Trond",
"Tormod",
"Tomas",
"Thor Henning",
"Thomas",
"Therese",
"Terje",
"Sverre",
"Lau",
"Esso",
"Sondre L.",
"Sondre B.",
"Skjalg",
"Sirius",
"Selina",
"Sara",
"Rune",
"Roar",
"Pål",
"Øyvind",
"Øystein",
"Ørjan K.",
"Bøtta The Buck",
"Ove",
"Ole Martin",
"NK-47",
"Neil",
"Morten S.",
"Morten L.",
"Martin",
"Markus",
"Marie",
"Leiv Ole",
"Lasse",
"Lars Tobias",
"Kjetil",
"Kim Christian",
"Kenneth",
"Jonas",
"Jon N.",
"Jon Magnus",
"Jon F.",
"Jenny",
"Jarl",
"Jan-Arne",
"Irene",
"Ingeborg",
"Henrik",
"Henning",
"Helene",
"Husbjørn",
"Håkon T.",
"Håkon N.",
"Håkon L.",
"Geoffrey",
"Frode",
"Fredrik O.",
"Fredrik G.",
"The Drolshammer",
"Elizabeth"];
// const rabbits = [
  
  
  
  
  
  
//   "Therese",
  
  
//   "Lau",
  
  
  
//   "Skjalg",
  
  
//   "Sara",
//   "Rune",
  
  
  
  
  
//   "Bøtta The Buck",
  
//   "Ole Martin",
//   "NK-47",
  
  
  
//   "Martin",
  
//   "Marie",
  
  
  
//   "Kjetil",
  
  
  
  
  
//   "Jon F.",
//   "Jenny",
  
  
  
//   "Ingeborg",
  
  
//   "Helene",
//   "Husbjørn",
  
  
  
  
  
  

//   "The Drolshammer",
//   ];
export const generateNewName = () => {
  return rabbits[Math.floor(Math.random() * rabbits.length)];
}
