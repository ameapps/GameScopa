/**Metodo che rimescola gli elementi di un array in modo casuale */
export function shuffleArray(array: any[]): any[] {
  try {
    let copy = array;
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  } catch (error) {
    console.error('Could not shaffle the array');
    return array;
  }
}
