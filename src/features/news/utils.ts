export const capitalizeWords = (word: string) => {
    const capitalizedWords = word
      .split(" ")
      .map((str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      })
      .join(" ");
  
    return capitalizedWords;
  };
  
  export const calculateMinutes = (date: Date) => {
    const today = new Date();
    const minutosTranscurridos = Math.floor(
      (today.getTime() - date.getTime()) / 60000
    );
    return minutosTranscurridos;
  };