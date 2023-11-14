import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
export default function UserManage() {
  const [eventRefresh, setEventRefresh] = useState(false)
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {

    }, [eventRefresh]);
    const handleRefresh = () => {
        console.log("a")
        setEventRefresh(prev => !prev)
    }
    return (
        <div
            style={{ marginTop: "80px", marginLeft: "20%" }}
            className="service-container"
        >
          <Box >
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab sx={{ width: "25%" }} label="Customer" value="1" />
                            <Tab sx={{ width: "25%" }} label="Staff" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1"><UserTable handleCallback={handleRefresh} role={"Customer"} /></TabPanel>
                    <TabPanel value="2"><UserTable handleCallback={handleRefresh} role={"Staff"}/></TabPanel>
                </TabContext>
            </Box>
            {/* <UserTable /> */}
        </div>
    );
}
