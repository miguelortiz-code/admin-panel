import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Label from '../atoms/Label';
import Card from '../atoms/Card';



export default function HomePage() {
  return (
    <div className='p-10 space-y-4'>
      <h1 className='text-3xl font-bold'>Ui test</h1>

      <Card>
        <Label text={'Correo electrónico'}/>
        <Input placeholder='Ingresa tu correo electrónico'/>

        <div className='flex gap-2 mt-4'>
          <Button>Guardar</Button>
          <Button variant='secondary'>Cancelar</Button>
          <Button variant='danger'>Eliminar</Button>
        </div>
      </Card>
    </div>
  );
}