import Image from "next/image";

export default function InfiniteScrollCard({
  name,
  image,
  status,
  species,
}: ResultsCharacter) {
  return (
    <div className="bg-gray-600 rounded-lg grid grid-cols-5 text-white">
      <div className="col-span-2">
        <Image src={image} alt="avt" className="object-fill" width={200} height={200} />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-2xl">{name}</p>
        <p>
          {status} - {species}
        </p>
      </div>
    </div>
  );
}
