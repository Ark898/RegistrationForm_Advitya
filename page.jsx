"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { userLogin } from "@/apis/api";
import { toast } from "react-toastify";

const defaultUser = {
	email: "",
	password: "",
};

const RegistrationForm = () => {
	const Router = useRouter();

	const [userData, setUserData] = React.useState(defaultUser);
	const [passShow, setPassShow] = useState(false);
  const [pincode, setPincode] = useState('');
  const [institutepincode, institutesetPincode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    // Validate if the entered value is numeric and restrict to 10 digits (for example)
    const regex = /^[0-9]{0,10}$/; // Change 10 to the desired maximum length for the phone number
    if (value === '' || regex.test(value)) {
      setPhoneNumber(value); // Update the phone number state if input is valid
    }
  };


  const handleInstitutePincodeChange = (e) => {
    const value = e.target.value;
    // Validate if the entered value is numeric and restrict to 6 digits (for example)
    const regex = /^[0-9]{0,6}$/; // Change 6 to the desired maximum length for the pincode
    if (value === '' || regex.test(value)) {
      institutesetPincode(value); // Update the pincode state if input is valid
    }
  };


    const handlePincodeChange = (e) => {
    const value = e.target.value;
    // Validate if the entered value is numeric and restrict to 6 digits (for example)
    const regex = /^[0-9]{0,6}$/; // Change 6 to the desired maximum length for the pincode
    if (value === '' || regex.test(value)) {
      setPincode(value); // Update the pincode state if input is valid
    }
  };

	const handleValueChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { email, password } = userData;
		if (!email || !password) {
			return toast.warn("Please fill all the fields!");
		}

		if (!email.includes("@")) {
			return toast.warn("Please enter a valid email!");
		}

		console.log(userData);

		const res = await userLogin(userData);
		console.log(res);

		if (res?.status === 200) {
			toast.success("User Logged in Successfully");
			// const loginData = {
			// 	email: userData.email,
			// 	password: userData.password,
			// };

			if (res.data?.token) {
				localStorage.setItem("userToken", res.data.token);
				Router.push("/profile");
			} else {
				toast.error("Something went wrong, please try again later");
			}
			setUserData(defaultUser);
		}
	};
	return (
		<>
			<div id="main" className="w-100vw bg-transparent h-screen relative flex flex-col items-center justify-center md:flex-row ">
				
				<div id="right" className="w-full z-10   h-auto flex flex-col items-center justify-center md:w-1/2 ">
					<Card className="w-[85%] sm:w-[70%] md:w-[85%] max-w-xl  bg-black bg-cover bg-center  md:bg-none  text-white">
						<CardHeader className="space-y-1">
							<CardTitle className="text-2xl  items-center">Registration Form</CardTitle>
							
						</CardHeader>
						<CardContent className="grid gap-4">
							

            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <Label htmlFor="email">Email Address</Label>
		            <Input type="email" name="email" id="email" className="text-xs lg:text-sm text-black" placeholder="Enter your email address" onChange={(e) => handleValueChange(e)} required />

                <Label htmlFor="email">Email Address</Label>
							   <Input type="email" name="email" id="email" className="text-xs lg:text-sm text-black" placeholder="Enter your email address" onChange={(e) => handleValueChange(e)} required />

                 <Label htmlFor="pincode">Pincode</Label>
                 <Input
                type="text"
                name="pincode"
                id="pincode"
                className="text-xs lg:text-sm text-black"
                placeholder="Enter Pincode"
                value={pincode}
                onChange={(e) => handlePincodeChange(e)}
                maxLength={6} // Change the maxLength according to your desired length for pincode
                required
                />
      
      
              </div>
              <div class="w-full md:w-1/2 px-3">
              <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                   type="text"
                   name="phoneNumber"
                   id="phoneNumber"
                   className="text-xs lg:text-sm text-black"
                   placeholder="Enter Phone Number"
                   value={phoneNumber}
                   onChange={(e) => handlePhoneNumberChange(e)}
                   maxLength={10} // Change the maxLength according to your desired length for phone number
                   required
      />
                
                 <Label htmlFor="email">Email Address</Label>
							   <Input type="email" name="email" id="email" className="text-xs lg:text-sm text-black" placeholder="Enter your email address" onChange={(e) => handleValueChange(e)} required />

                 <Label htmlFor="email">Email Address</Label>
							   <Input type="email" name="email" id="email" className="text-xs lg:text-sm text-black" placeholder="Enter your email address" onChange={(e) => handleValueChange(e)} required />

              </div>
            </div>

							<div className="grid gap-2 ">
                <Label htmlFor="address">Address</Label>
								<Input type="text" name="address" id="address" className="text-xs lg:text-sm text-black" placeholder="Enter your Address" onChange={(e) => handleValueChange(e)} required />
 
                <Label htmlFor="institute">Institute Name</Label>
								<Input type="text" name="institute" id="institute" className="text-xs lg:text-sm text-black" placeholder="Enter your Institute Name" onChange={(e) => handleValueChange(e)} required />
								
							</div>
              <div className="grid gap-2 ">
                
								<Label htmlFor="instituteAddress">Institute Address</Label>
								<Input type="text" name="instituteAddress" id="instituteAddress" className="text-xs lg:text-sm text-black" placeholder="Enter your Institute Address" onChange={(e) => handleValueChange(e)} required />

                <Label htmlFor="institutepincode">Institute Pincode</Label>
                 <Input
                type="text"
                name="pincode"
                id="pincode"
                className="text-xs lg:text-sm text-black"
                placeholder="Enter Institute Pincode"
                value={institutepincode}
                onChange={(e) => handleInstitutePincodeChange(e)}
                maxLength={6} // Change the maxLength according to your desired length for pincode
                required
                />                

							</div>
							{/* <div className="grid gap-2">
								<Label htmlFor="password">Password</Label>
								<div className="flex items-center relative">
									<Input type={!passShow ? "password" : "text"} name="password" id="password" className="text-xs lg:text-sm text-black" placeholder="Enter password" onChange={(e) => handleValueChange(e)} required />
									<div className="showpass cursor-pointer" onClick={() => setPassShow(!passShow)}>
										{!passShow ? "Show" : "Hide"}
									</div>
								</div>
							</div> */}
						</CardContent>
						<CardFooter className="flex-col">
							<Button className="w-full mb-2" onClick={(e) => handleSubmit(e)}>
								SUBMIT
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</>
	);
};

export default RegistrationForm;
