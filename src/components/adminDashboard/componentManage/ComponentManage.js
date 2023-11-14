import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ComponentTable from "./ComponentTable";
export default function ComponentManage() {
    const [value, setValue] = React.useState("1");
    const [eventRefresh, setEventRefresh] = useState(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    
    return (
        <div
            style={{ marginTop: "80px", marginLeft: "20%" }}
            className="service-container"
        >
          <ComponentTable/>
        </div>
    );
}
