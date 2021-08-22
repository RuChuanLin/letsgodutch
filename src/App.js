import DataTable from "./containers/DataTable";
import Panel from "./containers/Panel";

const events = [
  {
    date: new Date(),
    participants: {
      River: { cost: 130 },
      Jill: { cost: 130 },
      Tony: { cost: 130 },
      Gary: { cost: 130 },
    },
    delivery: {
      fee: 29,
    },
    payer: "River",
  },
  {
    date: new Date(),
    participants: {
      River: { cost: 115 },
      Jill: { cost: 110 },
      Tony: { cost: 110 },
      Gary: { cost: 110 },
    },
    delivery: {
      fee: 19,
    },
    payer: "River",
  },
  {
    date: new Date(),
    participants: {
      River: { cost: 100 },
      Jill: { cost: 200 },
      Tony: { cost: 300 },
      Gary: { cost: 400 },
    },
    delivery: {
      fee: 0,
    },
    payer: "Jill",
  },
];

const App = () => {
  return (
    <>
      <Panel></Panel>
      <DataTable events={events}></DataTable>
    </>
  );
};
export default App;
