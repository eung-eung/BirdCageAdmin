import React from 'react'
import FeedbackItem from './FeedbackItem'
import "./Feedback.css"
const feedback = [
    {
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSrdB8rRgA1qgkw0ckcTrhIa0kpV2ILvbMWg&usqp=CAU",
        fullName: "Phuong Hoai",
        content: "lorem asdouhnasiodb oasdfhhadnibfo",
        rating: "3",
        postDate: "23/09/2023",
        bookedStudio: "Vu studio"
    }, {
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSrdB8rRgA1qgkw0ckcTrhIa0kpV2ILvbMWg&usqp=CAU",
        fullName: "Phuong Hoai",
        content: "lorem asdouhnasiodb oasdfhhadnibfolorem asdouhnasiodb oasdfhhadnibfolorem asdouhnasiodb oasdfhhadnibfolorem asdouhnasiodb oasdfhhadnibfolorem asdouhnasiodb oasdfhhadnibfolorem asdouhnasiodb oasdfhhadnibfolorem asdouhnasiodb oasdfhhadnibfolorem asdouhnasiodb oasdfhhadnibfolorem asdouhnasiodb oasdfhhadnibfolorem asdouhnasiodb oasdfhhadnibfolorem asdouhnasiodb oasdfhhadnibfolorem asdouhnasiodb oasdfhhadnibfolorem asdouhnasiodb oasdfhhadnibfolorem asdouhnasiodb oasdfhhadnibfolorem asdouhnasiodb oasdfhhadnibfolorem asdouhnasiodb oasdfhhadnibfo",
        rating: "5",
        postDate: "23/09/2023",
        bookedStudio: "Vu studio"
    },
    {
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSrdB8rRgA1qgkw0ckcTrhIa0kpV2ILvbMWg&usqp=CAU",
        fullName: "Phuong Hoai",
        content: "lorem asdouhnasiodb oasdfhhadnibfo",
        rating: "5",
        postDate: "23/09/2023",
        bookedStudio: "Vu studio"
    }
]
export default function Feedback() {
    return (
        <div>
            <h3>Feedback</h3>
            <div className='card-feedback'>
                {feedback.map(fb => <FeedbackItem feedback={fb} />)}

            </div>

        </div>
    )
}
