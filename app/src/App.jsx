import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResults/SearchResult";
import '@fortawesome/fontawesome-free/css/all.min.css';


export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);

      try {
        const response = await fetch(BASE_URL);

        const json = await response.json();

        setData(json);
        setFilteredData(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch data");
      }
    };
    fetchFoodData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;

    console.log(searchValue);

    if (searchValue === "") {
      setFilteredData(null);
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };

  const filterFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedBtn(type);
  };

  const filterBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  if (error) return <div>{error}</div>;
  if (loading) return <div>loading.....</div>;

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/FoodLogo.png" alt="logo" />
          </div>

          <div className="search">
  <div className="search-wrapper">
    <input onChange={searchFood} placeholder="Search Food" />
    <span className="icon">
      <i className="fas fa-search"></i>
    </span>
  </div>
</div>

          <FilterContainer>
            {filterBtns.map((value) => (
              <Button
                isSelected={selectedBtn === value.type}
                key={value.name}
                onClick={() => filterFood(value.type)}
              >
                {value.name}
              </Button>
            ))}
          </FilterContainer>
        </TopContainer>
      </Container>
      <SearchResult data={filteredData} />
      <Footer>
  © 2024 Your Food App. All Rights Reserved.
</Footer>
    </>
  );
};

export default App;

export const Container = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  /* margin-top: 20px; */
  padding: 0; /* Reset padding */
`;

const TopContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;
  flex-wrap: wrap;
  padding: 8px 20px; /* Reduced padding for a compact height */
  background: #f5f5f5; /* Light grayish background */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Smooth shadow for navbar */

  .logo img {
    max-height: 100px; /* Reduce logo size for consistency */
    border-radius: 8px;
  }

  .search-wrapper {
    position: relative;
    width: 100%;
    max-width: 400px;
    

    input {
      width: 100%;
      background-color: white;
      border: none;
      border-radius: 30px;
      height: 40px; /* Reduced height */
      font-size: 14px; /* Slightly smaller font size */
      padding: 0 50px 0 20px;
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1); /* Softer shadow */
      transition: all 0.3s ease;
      

      &:focus {
        outline: none;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        transform: scale(1.02);
      }
      

      &::placeholder {
        color: #999;
        font-size: 13px;
        
      }
    }
    .icon {
      position: absolute;
      right: 15px;
      top: 50%;
      height: 20px;
      width: 20px;
     
      transform: translateY(-50%);
      font-size: 18px;
      color: orange; /* Slightly muted color */
      cursor: pointer;
      transition: color 0.3s ease;

      &:hover {
        color: #333;
      }
    }
    
  }
`;





const FilterContainer = styled.section`
  display: flex;
  gap: 15px;
  

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const Button = styled.button`
  background: ${({ isSelected }) =>
    isSelected
      ? "linear-gradient(90deg,  #ee7010 , #ff7e5f)"
      : "linear-gradient(90deg, #ee7010 , #ee7010)"};
  color: white;
  font-size: 14px;
  padding: 10px 20px;
  border: none;
  border-radius: 30px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: ${({ isSelected }) =>
      isSelected
        ? "linear-gradient(90deg, #feb47b, #ff7e5f)"
        : "linear-gradient(90deg,#feb47b, #ff7e5f)"};
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: none;
  }
`;
const Footer = styled.footer`
  padding: 10px 20px;
  background: #f5f5f5;
  color: #666;
  text-align: center;
  font-size: 14px;
  border-top: 1px solid #ddd; /* Subtle border for footer */
`;




