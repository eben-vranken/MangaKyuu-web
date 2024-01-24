'use client';

import { CaretDown, CaretUp, Plus } from "@phosphor-icons/react"

export default function Home() {
  return (
    // Home page
    <main className="flex flex-1 gap-x-2">
      {/* Manga View */}
      <section className="flex w-full bg-slate-50/5 ">

      </section>

      {/* Text Sidebar */}
      <aside className="flex flex-col max-w-[500px] w-[500px] items-start gap-y-2">
        {/* Title */}
        <section className="flex justify-between items-center w-full">
          <h1 className="font-bold text-lg text-primary">Translation</h1>

          {/* Add Button */}
          <section className="p-1 aspect-square bg-primary cursor-pointer rounded-lg hover:opacity-75">
            <Plus size={20} weight="bold" />
          </section>
        </section>

        {/* Dialogue List */}
        <section className="flex flex-col mt-1 w-full gap-y-2">
          {/* Individual Dialogue */}
          <section className="bg-text/5 p-2 rounded-md text-text/50 flex flex-col gap-y-2 shadow-lg opacity-80 hover:opacity-100  hover:cursor-pointer">
            {/* Speaker */}
            <h2 className="text-lg font-semibold text-text/75">Yotsuba:</h2>

            {/* Translations */}
            <section className="flex flex-col gap-y-1">
              {/* Japanese */}
              <section className="flex items-center gap-x-1">
                <span className="font-bold text-primary">
                  Japanese:
                </span>

                <span>
                  おー
                </span>
              </section>

              {/* Output Language */}
              <section className="flex items-center gap-x-1">
                <span className="font-bold">
                  English:
                </span>

                <span>
                  Oh...
                </span>
              </section>
            </section>

            {/* Toggle */}
            <section className="flex gap-x-1 items-center text-text/25 cursor-pointer">
              <CaretDown size={30} weight="bold" />
              <span className="border-b-2 border-text/25 w-full "></span>
            </section>
          </section>

          <section className="bg-text/5 p-2 rounded-md text-text/50 flex flex-col gap-y-2 shadow-lg opacity-80 hover:opacity-100  hover:cursor-pointer">
            {/* Speaker */}
            <h2 className="text-lg font-semibold text-text/75">Yousuke:</h2>

            {/* Translations */}
            <section className="flex flex-col gap-y-1">
              {/* Japanese */}
              <section className="flex items-center gap-x-1">
                <span className="font-bold text-primary">
                  Japanese:
                </span>

                <span>
                  まうすぐだぞー
                </span>
              </section>

              {/* Output Language */}
              <section className="flex items-center gap-x-1">
                <span className="font-bold">
                  English:
                </span>

                <span>
                  It's almost time, you know!
                </span>
              </section>
            </section>

            {/* Toggle */}
            <section className="flex gap-x-1 items-center text-text/25 cursor-pointer">
              <CaretUp size={30} weight="bold" />
              <span className="border-b-2 border-text/25 w-full "></span>
            </section>

            {/* Word List */}
            <section className="flex flex-col gap-y-1">
              {/* Word */}
              <section className="flex items-center gap-x-1">
                <span className="font-bold text-primary">
                  まうすぐ:
                </span>

                <span>
                  Almost
                </span>
              </section>

              {/* Word */}
              <section className="flex items-center gap-x-1">
                <span className="font-bold text-primary">
                  だ:
                </span>

                <span>
                  It is (informal)
                </span>
              </section>

              {/* Word */}
              <section className="flex items-center gap-x-1">
                <span className="font-bold text-primary">
                  そー:
                </span>

                <span>
                  You know! (informal, emphatic)
                </span>
              </section>
            </section>
          </section>
        </section>

      </aside>
    </main>
  );
}
