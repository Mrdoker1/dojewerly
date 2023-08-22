import Dropdown from "../../../Dropdown/Dropdown";

interface DetailsProps {
    props: {
      id: number;
      info: string;
      description: string;
      part: string;
      material: string;
      gender: string;
      type: string;
    };
    setProps: (props: any) => void;
  }


  const options = [{
    value: 'example',
    label: 'example'
  }]
  
  const DetailsSection: React.FC<DetailsProps> = (props) => {
    return (
      <div>
        <Dropdown 
          label="Body Part" 
          options={options} 
          onChange={(value) => console.log()} 
        />
        <Dropdown 
          label="Material" 
          options={options} 
          onChange={(value) => console.log()} 
        />
      </div>
    );
  };

  export default DetailsSection;