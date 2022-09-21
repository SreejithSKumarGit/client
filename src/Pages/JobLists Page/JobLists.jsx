import React from "react";
import { Navbar } from "../../Components/Navbar/Navbar";
import JobListsStyles from "./JobLists.module.css";
import {Button,
        Modal,
        ModalOverlay,
        ModalContent,
        ModalHeader,
        ModalFooter,
        ModalBody,
        ModalCloseButton,
        useDisclosure} from "@chakra-ui/react"
import {useNavigate} from "react-router-dom"
export function JobLists()
{
    const [jobs,setJobs]=React.useState([]);
    const [formData,setFormData]=React.useState({
        title:"",
        company:"",
        location:"",
        description:"",

    })
    const [sortValue,setSortValue]=React.useState("");
    const navigate=useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()

    //Funtion to fetch all the jobs display it in the UI
    async function getJobs()
    {
        try {
            const data=await fetch("https://tradify-services-assignment.herokuapp.com/getAllJobs")
            const res=await data.json();
            setJobs(res.data);
            console.log(res.data);

        } catch (error) {
            console.log(error);
        }
    }

    //Function to handle changes in the input field
    const handleChange=(e)=>
    {
        const {name,value}=e.target;
        setFormData({...formData,[name]:value});
    }

    //Function to post job
    async function handleJobSubmit()
    {
        try {
            const data= await fetch("https://tradify-services-assignment.herokuapp.com/addjob",{
                method:"POST",
                body:JSON.stringify(formData),
                headers:{"Content-Type":"Application/json"}
            })
            const res=await data.json();
            console.log(res.message);
            setFormData({
                title:"",
                company:"",
                location:"",
                description:"",
        
            })
            getJobs();
            onClose();
        } catch (error) {
            console.log(error);
        }
    }

    const handleSortChange=(e)=>
    {
        const {value}=e.target;
        setSortValue(value);
        if(value==="popularity")
        {
            jobs.sort((a,b)=>
            {
                return b.no_of_checks-a.no_of_checks;
            })
            setJobs(jobs);
        }
        else if(value==="new")
        {
            
            jobs.sort((a,b)=>
            {
                return new Date(b.time_stamp)-new Date(a.time_stamp);
            })
            setJobs(jobs);
        }
        else if(value==="old")
        {
            jobs.sort((a,b)=>
            {
                return new Date(a.time_stamp)-new Date(b.time_stamp);
            })
            setJobs(jobs);
        }
        else
        {
            getJobs()
        }
        
    }
   
    //Updates the UI everytime it reloads
    React.useEffect(()=>
    {
        getJobs();
    },[])
    const {title,company,location,description}=formData;
    return (
    <>
    <Navbar/>
    <div>
        {
            jobs.length>0?
            <>
            <div className={JobListsStyles.SortContainer}>
                
                <select name="sortValue" value={sortValue} onChange={(e)=>(handleSortChange(e))} id="">
                    <option value="">Default</option>
                    <option value="popularity">Popularity</option>
                    <option value="new">Newer</option>
                    <option value="old">Older</option>
                </select>
                <label htmlFor="" >Sort By</label>
            </div>
            <div className={JobListsStyles.Container} >
                <div className={JobListsStyles.JobsContainer}>
                    {
                        jobs?.map((item)=>
                        (
                        <div key={item._id} className={JobListsStyles.JobFlexBox} >
                                <div className={JobListsStyles.JobCard} >
                                    <h1 className={JobListsStyles.JobTitle}>{item.title}</h1>
                                    <div className={JobListsStyles.LocationContainer}>
                                        <img src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/344/external-company-town-xnimrodx-lineal-xnimrodx-4.png" alt="" />
                                        <h1 className={JobListsStyles.CompanyName}>{item.company}</h1>
                                    </div>
                                    
                                    <div className={JobListsStyles.LocationContainer}>
                                        <img src="https://img.icons8.com/ios-filled/344/marker.png" alt="" />
                                        <h1 className={JobListsStyles.Location}>{item.location}</h1>
                                    </div>
                                    <div className={JobListsStyles.LocationContainer} >
                                        <img src="https://img.icons8.com/ios/344/calendar--v1.png" alt="" />
                                        <h1 className={JobListsStyles.PostedDate}>{item.time_stamp.slice(0,10).split("-").reverse().join("-")}</h1>
                                    </div>
                                </div>
                                <div>
                                    <Button onClick={()=>(
                                        navigate(`/jobDetails/${item._id}`)
                                    )} colorScheme="blue">Apply Now</Button>
                                    
                                </div>
                        </div>
                            
                        ))
                    }
                    
                </div>
                <div className={JobListsStyles.PostJobContainer}>
                    <Button onClick={onOpen} colorScheme="green">Post a Job</Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay/>
                        <ModalContent>
                            <ModalHeader>Post a job</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <form className={JobListsStyles.FormContainer} >
                                    <div className={JobListsStyles.InputContainer} >
                                        <label htmlFor="">Job role</label>
                                        <input 
                                            type="text"
                                            name="title"
                                            value={title}
                                            onChange={(e)=>(handleChange(e))} />
                                    </div>
                                    <div className={JobListsStyles.InputContainer}>
                                        <label htmlFor="">Company</label>
                                        <input 
                                            type="text"
                                            name="company"
                                            value={company}
                                            onChange={(e)=>(handleChange(e))} />
                                    </div>
                                    <div className={JobListsStyles.InputContainer}>
                                        <label htmlFor="">Location</label>
                                        <input 
                                            type="text"
                                            name="location"
                                            value={location}
                                            onChange={(e)=>(handleChange(e))} />
                                    </div>
                                    <div className={JobListsStyles.InputContainer}>
                                        <label htmlFor="">Description</label>
                                        <textarea 
                                            name="description" 
                                            value={description}
                                            onChange={(e)=>(handleChange(e))}
                                            cols="30" 
                                            rows="10"></textarea>
                                    </div>
                                    
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={handleJobSubmit} colorScheme='blue' mr={3}>
                                Save
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </div>
                
            </div>
            </>:
            <div>
                There are no jobs available!!
            </div>
        }
    </div>
    </>
    )
}