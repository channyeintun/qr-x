'use client'

import Form from 'components/Form'
import Motion from 'components/Motion'
import { Circle, Leaf, Square } from 'icons/Shapes'
import { Fragment, ReactNode } from 'react'
import * as Yup from 'yup'
import QRX from '@qr-x/react'
import Editor from 'components/Editor'

const schema = Yup.object({
  data: Yup.string().required(),
  bodyShape: Yup.string().required(),
  eyeBallShape: Yup.string().required(),
  eyeFrameShape: Yup.string().required(),
})

const shapes = {
  leaf: { name: 'leaf', icon: <Leaf /> },
  square: { name: 'square', icon: <Square /> },
  circle: { name: 'circle', icon: <Circle /> },
}

function ShapePicker({
  shape,
  shapes,
  setShape,
}: {
  shape: string
  shapes: { name: string; icon: ReactNode }[]
  setShape: (shape: string) => void
}) {
  return (
    <ul className='flex space-x-4'>
      {shapes.map(({ name, icon }) => (
        <li
          key={name}
          className={`size-[4.75rem] cursor-pointer duration-150 transition-colors flex flex-center rounded-2xl ${shape === name ? 'bg-white' : 'bg-black'}`}
          onClick={() => setShape(name)}
        >
          {icon}
        </li>
      ))}
    </ul>
  )
}

const codes = {
  react: ({ data, bodyShape, eyeBallShape, eyeFrameShape }: any) => `import QRX from '@qr-x/react';

<QRX 
  data='${data}' 
  shapes={{ body:'${bodyShape}', eyeball:'${eyeBallShape}', eyeframe:'${eyeFrameShape}' }} 
/>`,
}

export default function Playground() {
  return (
    <Form
      schema={schema}
      defaults={{ data: '', bodyShape: 'square', eyeBallShape: 'square', eyeFrameShape: 'square' }}
      onSubmit={() => {}}
    >
      {({ values, setValue }) => (
        <Fragment>
          <div className='flex space-x-5 justify-between'>
            <Motion className='flex-1 max-w-xl space-y-8 my-8'>
              <fieldset>
                <label className='text-base font-medium mb-4 block text-white' htmlFor='data'>
                  Data URL
                </label>
                <textarea
                  id='data'
                  name='data'
                  className='bg-white rounded-xl w-full min-h-20 resize-none p-2'
                  onChange={e => setValue('data', e.target.value)}
                ></textarea>
              </fieldset>
              <fieldset>
                <label className='text-base font-medium mb-4 block text-white' htmlFor='color'>
                  Color code
                </label>
                <input name='color' id='color' className='bg-white rounded-xl w-full h-10 p-2'></input>
              </fieldset>
              <fieldset>
                <label className='text-base font-medium mb-4 block text-white' htmlFor='color'>
                  Body
                </label>
                <ShapePicker
                  shape={values.bodyShape}
                  shapes={[shapes.square, shapes.circle, shapes.leaf]}
                  setShape={shape => setValue('bodyShape', shape)}
                />
              </fieldset>
              <fieldset>
                <label className='text-base font-medium mb-4 block text-white' htmlFor='color'>
                  Eyeframe
                </label>
                <ShapePicker
                  shape={values.eyeFrameShape}
                  shapes={[shapes.square, shapes.circle, shapes.leaf]}
                  setShape={shape => setValue('eyeFrameShape', shape)}
                />
              </fieldset>
              <fieldset>
                <label className='text-base font-medium mb-4 block text-white' htmlFor='color'>
                  Eyeball
                </label>
                <ShapePicker
                  shape={values.eyeBallShape}
                  shapes={[shapes.square, shapes.circle, shapes.leaf]}
                  setShape={shape => setValue('eyeBallShape', shape)}
                />
              </fieldset>
            </Motion>
            <Motion>
              <div className='size-[30rem] flex flex-center bg-white rounded-3xl'>
                <QRX
                  data={values.data}
                  shapes={{
                    body: values.bodyShape as never,
                    eyeball: values.eyeBallShape as never,
                    eyeframe: values.eyeFrameShape as never,
                  }}
                  className='w-96'
                />
              </div>
            </Motion>
          </div>
          <Editor code={codes.react(values)} />
        </Fragment>
      )}
    </Form>
  )
}
