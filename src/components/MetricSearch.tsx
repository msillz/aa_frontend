import { Select, useSafeMantineTheme } from '@mantine/core';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getMetricMap } from '../api/constants';



export default function MetricSearch() {

    const [metricMap, setMetricMap] = useState({});
    const [metricArray, setMetricArray] = useState<any[]>([]);

    useEffect(()=>{
        getMetricMap().then((data)=>{
            setMetricMap(data);
            console.log(Object.values(data).map((obj)=>obj.name));
            setMetricArray(Object.values(data).map((obj)=>obj.name));
        });
    }, [])


    function getValues(){
        return [];
    }

    function setValues(){
        return null;
    }

    return (
        <Select
            label="100 000 options autocomplete"
            placeholder="Use limit to optimize performance"
            limit={5}
            data={metricArray}
            searchable
        />
    );
}
