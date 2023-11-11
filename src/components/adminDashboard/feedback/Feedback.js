import React from 'react'
import FeedbackItem from './FeedbackItem'
import "./Feedback.css"
const feedback = [
    {
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSrdB8rRgA1qgkw0ckcTrhIa0kpV2ILvbMWg&usqp=CAU",
        fullName: "A",
        content: "lorem asdouhnasiodb oasdfhhadnibfo",
        rating: "3",
        postDate: "23/09/2023",

    }, {
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSrdB8rRgA1qgkw0ckcTrhIa0kpV2ILvbMWg&usqp=CAU",
        fullName: "Tâm nguyễn",
        content: "lorem asdouhnasiodb oasdfhhadnibfolorem asdouhnasiodb oasdfhhadnibfolorem asdouhnasiodb oasdfhhadnibfolorem asdouhnasiodb oasdfhhadnibfolorem asdouhnasiodb oasdfhhadnibfolorem asdouhnasiodb oasdfhhadnibfolorem asdouhnasiodb oasdfhhadnibfolorem asdouhnasiodb oasdfhhadnibfolorem asdouhnasiodb oasdfhhadnibfolorem asdouhnasiodb oasdfhhadnibfolorem asdouhnasiodb oasdfhhadnibfolorem asdouhnasiodb oasdfhhadnibfolorem asdouhnasiodb oasdfhhadnibfolorem asdouhnasiodb oasdfhhadnibfolorem asdouhnasiodb oasdfhhadnibfolorem asdouhnasiodb oasdfhhadnibfo",
        rating: "5",
        postDate: "23/09/2023",

    },
    {
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSrdB8rRgA1qgkw0ckcTrhIa0kpV2ILvbMWg&usqp=CAU",
        fullName: "Tài phiệt no name",
        content: "lorem asdouhnasiodb oasdfhhadnibfo",
        rating: "5",
        postDate: "23/09/2023",

    }
]
export default function Feedback() {
    document.title = "Feedback Management"
    return (
        <div>
            <h3>Feedback</h3>
            <div className='card-feedback'>
                {feedback.map(fb => <FeedbackItem feedback={fb} />)}

            </div>

        </div>
    )
}
