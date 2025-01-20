import { BorderTrail } from '@/components/ui/border-trail';

function Feature() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center pt-40  overflow-hidden">
      <div className="w-3/4 lg:w-1/2 aspect-square rounded-3xl relative bg-background border">
        <BorderTrail
          style={{
            boxShadow: '0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)'
          }}
          size={100}
          className="opacity-50"
        />
        <div className="p-2 w-full h-full aspect-square relative">
          {/* left circle */}
          <div className="bg-background w-24 lg:w-32 border p-4 rounded-full aspect-square absolute -translate-y-1/2 top-0 left-0 -translate-x-1/2">
            <BorderTrail
              style={{
                boxShadow: '0px 0px 40px 20px rgb(255 255 255 / 50%), 0 0 60px 30px rgb(0 0 0 / 100%), 0 0 80px 40px rgb(0 0 0 / 100%)'
              }}
              size={20}
              className="opacity-50"
              delay={0.5}
            />
            <div className="bg-zinc-100 w-full h-full inset-0 rounded-full shadow3d" />
          </div>
          {/* middle circle */}
          <div className="gradient-bg-3 w-48 lg:w-64 p-3 rounded-3xl border-2 aspect-square absolute -translate-y-1/2 top-0 left-1/2 -translate-x-1/2">
            <div className="bg-zinc-50 shadow3d w-full h-full inset-0 rounded-2xl" />
          </div>
          {/* right circle */}
          <div className="bg-background w-24 lg:w-32 p-4 border rounded-full aspect-square absolute -translate-y-1/2 top-0 right-0 translate-x-1/2">
            <BorderTrail
              style={{
                boxShadow: '0px 0px 40px 20px rgb(255 255 255 / 50%), 0 0 60px 30px rgb(0 0 0 / 100%), 0 0 80px 40px rgb(0 0 0 / 100%)'
              }}
              size={20}
              className="opacity-50"
            />
            <div className="bg-zinc-50 w-full h-full inset-0 rounded-full shadow3d" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feature;
