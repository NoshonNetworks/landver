import { useEffect, useState } from "react";
import { num, hash, RpcProvider, events as starknetEvents, CallData } from "starknet";
import { ABI as LandRegistryABI } from "@/abis/LandRegistryAbi";

import type { UseEventsParams, Event, ParsedEventsEnum } from "@/types/interfaces"; 

const contracts = {
  landRegister: { address:"0x5a4054a1b1389dcd48b650637977280d32f1ad8b3027bc6c7eb606bf7e28bf5", abi: LandRegistryABI }
}


export function useEvents<ParsedEvent extends ParsedEventsEnum>({ name, triggerRefetch, filters }: UseEventsParams) { 

    const [events, setEvents] = useState<Event<ParsedEvent>[]>([])
    const [loading, setLoading] = useState(false)
    
    useEffect(()=>{
        (async()=>{
          try {
            setLoading(true)
            const provider = new RpcProvider({ });
            // num.toHex(hash.starknetKeccak('LandRegistered')), 
            const eventFilters = filters?.events.map(event => num.toHex(hash.starknetKeccak(event))) || []

            const keyFilter = [
              [
                ...eventFilters
              ],
            ];

            const eventsRes = await provider.getEvents({
              address: "0x5a4054a1b1389dcd48b650637977280d32f1ad8b3027bc6c7eb606bf7e28bf5",
              keys: keyFilter,
              chunk_size: 30,
            });
    
            // parsing event
            const abiEvents = starknetEvents.getAbiEvents(contracts[name].abi);
            const abiStructs = CallData.getAbiStruct(contracts[name].abi);
            const abiEnums = CallData.getAbiEnum(contracts[name].abi);
            const parsed = starknetEvents.parseEvents(eventsRes.events, abiEvents, abiStructs, abiEnums);
            
            const formattedEvents:Event<ParsedEvent>[] = []
    
            for (let i:number = 0; i <eventsRes.events.length; i++) {
              const rawEvent = eventsRes.events[i]
              const parsedEvent = parsed[i]
    
              const fullKeys = Object.keys(parsedEvent)[0].split("::");
              const eventName = fullKeys[fullKeys.length - 1]
    
              formattedEvents.push({
                eventKey:Object.keys(parsedEvent)[0],
                eventName,
                rawEvent, 
                parsedEvent: parsedEvent[Object.keys(parsedEvent)[0]] as unknown as ParsedEvent // first to unknows because we dont know what event type is on the item
              })
            }
            setEvents(formattedEvents)
            setLoading(false)
          } catch (error) {
            setLoading(false)
            console.log("error on events hook",error)
          }
        })()
      }, [triggerRefetch])
      
  return {
    events, 
    isLoading:loading 
  }
}