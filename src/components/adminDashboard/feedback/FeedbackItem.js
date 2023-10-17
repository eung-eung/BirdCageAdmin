import React from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import avatar from "../../../images/user.jpg"
import StarFeedback from './StarFeedback';
export default function FeedbackItem(feedback) {
    const theme = useTheme();
    console.log(feedback.feedback)
    const stars = Array.from({ length: feedback.feedback.rating }, () => <StarIcon />);
    return (
        <Card
            sx={{
                display: 'flex',
                width: "40%",
                borderRadius: "10px",
                marginTop: "30px",
                boxShadow: "rgb(25 78 100 / 46%) 0px 2px 4px 0px, rgb(0 42 60 / 32%) 0px 2px 16px 0px"
            }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: "100%" }}>
                <CardMedia
                    component="img"
                    sx={{ width: 70, height: 70, objectFit: "cover", borderBottomRightRadius: 20 }}
                    image={feedback.feedback.avatar}
                    alt="Live from space album cover"
                />
                <CardContent sx={{ width: "100%" }}>
                    <Typography
                        sx={{ fontWeight: "600" }}
                        variant="subtitle2"
                        color="#212121"
                        component="div"
                        align='left'
                    >
                        {feedback.feedback.fullName}

                    </Typography>
                    {/* stars rating and booked date */}
                    <Typography
                        sx={{ display: 'flex', alignItems: "center", justifyContent: "space-between", width: "100%" }}
                        component="div" variant="h5" >
                        <Typography component="div" variant="h5">
                            <StarFeedback rating={feedback.feedback.rating} />
                        </Typography>
                        <Typography
                            sx={{ color: "#696969" }}
                            component="div"
                            variant="subtitle2"
                        >
                            Booked Studio: <Typography color="#235A8F" style={{ fontWeight: 500 }} component="span" >
                                {feedback.feedback.bookedStudio}
                            </Typography>
                        </Typography>
                    </Typography>
                    {/* rating content */}
                    <Typography sx={{ textAlign: "left", marginTop: "10px" }} component="div" variant="caption">
                        {feedback.feedback.content}
                    </Typography>

                    {/* user */}
                    <Typography
                        sx={{ marginTop: "30px", fontWeight: 600 }}
                        variant="subtitle2"
                        align='right'
                        color="#696969"
                        component="div"
                    >
                        {feedback.feedback.postDate}
                    </Typography>

                </CardContent>

            </Box>

        </Card>

    )
}
