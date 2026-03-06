import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const procedures = [
  {
    title: "Sapphire FUE Technique",
    image:
      "https://res.cloudinary.com/dha2ecdnn/image/upload/v1742129556/fue-banner_tmxskw.jpg",
    features: [
      "Micro Sapphire Pen",
      "3 x PRP Session.",
      "1 Year Online Post-operative Follow Up",
      "Guarantee Certificate.",
    ],
  },
  {
    title: "Turkey Experts Turkey Specialist Technique",
    image:
      "https://res.cloudinary.com/dha2ecdnn/image/upload/v1742122125/turkey-doctor_yhwmt3.webp",
    features: [
      "Turkish Choi Pen",
      "3 x PRP Session.",
      "1 Year Online Post-operative Follow Up",
      "Guarantee Certificate.",
    ],
    highlight: true,
  },
  {
    title: "Turkey Specialist Technique",
    image:
      "https://res.cloudinary.com/dha2ecdnn/image/upload/v1742129542/Turkey Specialist Technique-banner_cfkksz.jpg",
    features: [
      "Turkish Choi Pen",
      "3 x PRP Session.",
      "1 Year Online Post-operative Follow Up",
      "Guarantee Certificate.",
    ],
  },
];

export default function OurTechnique() {
  return (
    <section className=" bg-white flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-8 py-12">
        {procedures.map((procedure, idx) => (
          <Card
            key={idx}
            className={`rounded-xl shadow-md transition-all duration-600 hover:bg-[#45758b] translate-y-5 hover:translate-0 cursor-pointer ease-in-out hover:text-white ${
              procedure.highlight ? "bg-[#45758b] text-white translate-y-0" : "bg-white"
            }`}
          >
            <CardContent className="flex flex-col items-center py-4 px-8">
              <div className="w-48 h-48 mb-4 ">
                <Image
                  src={procedure.image}
                  alt={procedure.title}
                  width={230}
                  height={230}
                  className="rounded-full object-cover shadow-2xl border-4 w-full h-full"
                />
              </div>
              <h3 className="small_heading mt-2 font-bold underline text-center mb-4 uppercase">
                {procedure.title}
              </h3>
              <ul className="space-y-2 w-full">
                {procedure.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex border-b-[1px] border-pink-300  title items-start gap-2 pb-1 pt-2"
                  >
                    <Check className="w-4 h-4 mt-1" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="mt-6 bg-transparent border-1 shadow-lg cursor-pointer text text-  ">Book Appointment</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
