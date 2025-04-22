import React from 'react'
import FeatureCourses from '../home/FeatureCources'

export default function AllcoursesPage({data}:any) {
  return (
    <div>
        {data &&
            data.map((item: any, i: number) => (
              <FeatureCourses data={item} key={i} test={item} />
            ))}
    </div>
  )
}
