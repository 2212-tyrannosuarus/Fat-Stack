import React, {useState} from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Card from 'react-bootstrap/Card';

function TrendsToggleButtonGroup(props) {
    const {handleOvertime, handleCategoryPie, handleMerchantPie} = props;
    const [checked1, setChecked1] = useState(true);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);

  return (
    <div className="col-2">
      <Card style={{ width: '12rem' }}>
      <Card.Body>
        <Card.Title>Spending Graphs</Card.Title>
        <Card.Text>
        <ToggleButtonGroup type="radio" name="options" defaultValue={1} vertical style={{ width: '10rem' }}>
        <ToggleButton id="tbg-radio-1" value={1} onClick={() => {handleOvertime(); setChecked2(false); setChecked3(false); setChecked1(true)}} variant="link" className={checked1 ? "toggle-graph-checked" : "btn-block toggle-graph"}>
          Overtime
        </ToggleButton>
        <ToggleButton id="tbg-radio-2" value={2} onClick={() => {handleCategoryPie(); setChecked1(false); setChecked3(false); setChecked2(true)}} variant="link" className={checked2 ? "toggle-graph-checked" : "btn-block toggle-graph"}>
          By Category
        </ToggleButton>
        <ToggleButton id="tbg-radio-3" value={3} onClick={() => {handleMerchantPie(); setChecked2(false); setChecked1(false); setChecked3(true)}} variant="link" className={checked3 ? "toggle-graph-checked" : "btn-block toggle-graph"}>
          By Merchant
        </ToggleButton>
      </ToggleButtonGroup>
        </Card.Text>
      </Card.Body>
    </Card>
      
    </div>
  );
}

export default TrendsToggleButtonGroup;