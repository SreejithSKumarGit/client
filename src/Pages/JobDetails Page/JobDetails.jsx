import React from "react";
import {useParams} from "react-router-dom";
import JobDetailsStyles from "./JobDetails.module.css";
import {Button,
        Modal,
        ModalOverlay,
        ModalContent,
        ModalHeader,
        ModalFooter,
        ModalBody,
        ModalCloseButton,
        Table,
        Thead,
        Tbody,
        Tfoot,
        Tr,
        Th,
        Td,
        TableCaption,
        TableContainer,
        Link,
        useDisclosure} from "@chakra-ui/react"


export function JobDetails()
{
    const {_id}=useParams();
    const [jobDetail,setJobDetail]=React.useState({})
    const [formData,setFormData]=React.useState({
        _id:_id,
        name:"",
        email:"",
        experience:"",
        ctc:"",
        resume_link:""

    })
    const { isOpen, onOpen, onClose } = useDisclosure()
    const modal1 = useDisclosure();
    const modal2 = useDisclosure();
    const handleChange=(e)=>
    {
        const {name,value}=e.target;
        setFormData({...formData,[name]:value});
    }
    async function getJobDetails()
    {
        try {
            const data=await fetch("https://tradify-services-assignment.herokuapp.com/getjobdetails",{
                method:"POST",
                body:JSON.stringify({_id:_id}),
                headers:{"Content-type":"Application/json"}
            })
            const res=await data.json()
            setJobDetail(res.data)

        } catch (error) {
            console.log(error);
        }
    }
    async function handleSubmit()
    {
        try {
            const data= await fetch("https://tradify-services-assignment.herokuapp.com/addapplicant",{
                method:"POST",
                body:JSON.stringify(formData),
                headers:{"Content-Type":"Application/json"}
            })
            const res=await data.json();
            console.log(res);
            setFormData({
                _id:_id,
                name:"",
                email:"",
                experience:0,
                ctc:0,
                resume_link:""
            })
        } catch (error) {
            console.log(error);
        }
    }
    React.useEffect(()=>
    {
        getJobDetails();
    })
    const {name,email,experience,ctc,resume_link}=formData;
    return (
        jobDetail._id?
        <div>
            <div>
                <div className={JobDetailsStyles.JobCard} >
                    <h1 className={JobDetailsStyles.JobTitle}>{jobDetail.title}</h1>
                    <div className={JobDetailsStyles.LocationContainer}>
                        <img src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/344/external-company-town-xnimrodx-lineal-xnimrodx-4.png" alt="" />
                        <h1 className={JobDetailsStyles.CompanyName}>{jobDetail.company}</h1>
                    </div>
                    <div className={JobDetailsStyles.LocationContainer}>
                        <img src="https://img.icons8.com/ios-filled/344/marker.png" alt="" />
                        <h1 className={JobDetailsStyles.Location}>{jobDetail.location}</h1>
                    </div>
                    <div className={JobDetailsStyles.LocationContainer} >
                        <img src="https://img.icons8.com/ios/344/calendar--v1.png" alt="" />
                        <h1 className={JobDetailsStyles.PostedDate}>{jobDetail.time_stamp.slice(0,10).split("-").reverse().join("-")}</h1>
                    </div>
                    <div className={JobDetailsStyles.LocationContainer} >
                        <img src="https://img.icons8.com/pastel-glyph/344/groups--v3.png" alt="" />
                        <h1 className={JobDetailsStyles.PostedDate}>{jobDetail.applicants.length} applicants</h1>
                        <Button onClick={modal2.onOpen}>See All</Button>
                        <Modal size="6xl" isOpen={modal2.isOpen} onClose={modal2.onClose}>
                            <ModalOverlay/>
                            <ModalContent>
                                <ModalHeader>Applicants</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    {
                                        jobDetail.applicants.length!==0?
                                        <TableContainer>
                                            <Table>
                                                <Thead>
                                                    <Tr>
                                                        <Th>NO.</Th>
                                                        <Th>Name</Th>
                                                        <Th>Experience</Th>
                                                        <Th>Expected CTC</Th>
                                                        <Th>Resume Link</Th>
                                                    </Tr>
                                                </Thead>
                                                <Tbody>
                                                    { jobDetail.applicants.map((item,i)=>
                                                    (
                                                        <Tr key={item._id}>
                                                            <Td>{i+1}</Td>
                                                            <Td>{item.name}</Td>
                                                            <Td>{item.experience}</Td>
                                                            <Td>{item.ctc}</Td>
                                                            <Td> <a href={item.resume_link}  target="_blank" rel="noreferrer">{item.resume_link}</a> </Td>
                                                        </Tr>
                                                    ))
                                                    }
                                                    
                                                </Tbody>
                                            </Table>
                                        </TableContainer>:
                                        <h1>There are no applicants</h1>

                                    }
                                </ModalBody>
                            </ModalContent>

                        </Modal>
                    </div>
                    <div className={JobDetailsStyles.DescriptionBox} >
                        <h1>Description</h1>
                        <div className={JobDetailsStyles.DescriptionContainer}>
                            <h1 className={JobDetailsStyles.PostedDate}>{jobDetail.description}</h1>
                        </div> 
                    </div>
                    <div>
                        <Button onClick={modal1.onOpen} colorScheme="green">Easy Apply</Button>
                        <Modal isOpen={modal1.isOpen} onClose={modal1.onClose}>
                        <ModalOverlay/>
                        <ModalContent>
                            <ModalHeader>Apply for the job</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <form className={JobDetailsStyles.FormContainer} >
                                    <div className={JobDetailsStyles.InputContainer} >
                                        <label htmlFor="">Name</label>
                                        <input 
                                            type="text"
                                            name="name"
                                            value={name}
                                            onChange={(e)=>(handleChange(e))} />
                                    </div>
                                    <div className={JobDetailsStyles.InputContainer}>
                                        <label htmlFor="">Email</label>
                                        <input 
                                            type="text"
                                            name="email"
                                            value={email}
                                            onChange={(e)=>(handleChange(e))} />
                                    </div>
                                    <div className={JobDetailsStyles.InputContainer}>
                                        <label htmlFor="">Experience</label>
                                        <input 
                                            type="number"
                                            name="experience"
                                            value={experience}
                                            onChange={(e)=>(handleChange(e))} />
                                    </div>
                                    <div className={JobDetailsStyles.InputContainer}>
                                        <label htmlFor="">Expected CTC</label>
                                        <input 
                                            type="number"
                                            name="ctc"
                                            value={ctc}
                                            onChange={(e)=>(handleChange(e))} />
                                    </div>
                                    <div className={JobDetailsStyles.InputContainer}>
                                        <label htmlFor="">Resume Link</label>
                                        <input 
                                            type="text"
                                            name="resume_link"
                                            value={resume_link}
                                            onChange={(e)=>(handleChange(e))} />
                                    </div>
                                    
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={handleSubmit} colorScheme='blue' mr={3}>
                                Submit
                                </Button>
                                <Button onClick={modal1.onClose}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    </div>
                </div>
            </div>
            
        </div>:
        <div>

        </div>
    )
}