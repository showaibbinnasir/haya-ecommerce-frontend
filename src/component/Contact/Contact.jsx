import { Button, Input, Label, Textarea, toast } from "keep-react";
import Footer from "../Footer/Footer";
import emailjs from "@emailjs/browser";
const Contact = () => {
    const handleSubmitButton = e => {
        e.preventDefault()
        emailjs.sendForm("service_wk6gb5f", "template_0s2bmzo", e.target, "gInjccIl4ZwYBMeuN")
        toast.success("Message sent!")
        e.target.reset()
    }
    return (
        <div>
            <h1 className="text-2xl text-center font-semibold py-5">Contact</h1>
            <div className="flex justify-center">
                <form onSubmit={handleSubmitButton} className="w-[350px]">
                    <fieldset className="max-w-md space-y-1">
                        <Label htmlFor="name">Enter Name</Label>
                        <Input name="name" id="name" placeholder="Enter name" type="text" />
                    </fieldset>
                    <fieldset className="max-w-md space-y-1">
                        <Label htmlFor="name">Enter Email</Label>
                        <Input name="email" id="email" placeholder="Enter you email" type="mail" />
                    </fieldset>
                    <fieldset className="max-w-md space-y-1">
                        <Label htmlFor="name">Enter Phone number</Label>
                        <Input name="phone" id="Phone" placeholder="Enter your phone number" type="text" />
                    </fieldset>
                    <fieldset className="max-w-md space-y-1">
                        <Label htmlFor="name">Enter Your message</Label>
                        <Textarea name="text" id="message" placeholder="Write your message here." rows={8} />
                    </fieldset>
                    <Button className="bg-[black] text-white w-[150px] my-5" type="submit">Submit</Button>
                </form>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Contact;