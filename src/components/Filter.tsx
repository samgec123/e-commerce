import ReactWordcloud from "react-wordcloud";

interface FilterProps {
  data: { text: string; value: number }[];
}

const callbacks = {
  getWordColor: (word) => (word.value > 15 ? "blue" : "red"),
  onWordClick: console.log,
  onWordMouseOver: console.log,
  getWordTooltip: (word) =>
    `${word.text} (${word.value}) [${word.value > 5 ? "good" : "bad"}]`,
};
const options = {
  rotations: 2,
  rotationAngles: [-90, 0],
};
const size = [600, 400];

const Filter: React.FC<FilterProps> = (props: FilterProps) => {
  const words = props.data.map((item) => ({
    text: item.text,
    value: item.value,
  }));
  console.log("words", words);
  return (
    <ReactWordcloud
      callbacks={callbacks}
      options={options}
      size={size}
      words={words}
    />
  );
};

export default Filter;
