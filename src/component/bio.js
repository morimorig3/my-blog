import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { IoPersonOutline } from 'react-icons/io5';
import { SiQiita, SiTwitter, SiGithub } from 'react-icons/si';

const URL = {
  twitter: 'https://twitter.com/morimorig3',
  github: 'https://github.com/morimorig3',
  qiita: 'https://qiita.com/morimorig3',
};

const Bio = () => {
  return (
    <div className="rounded-lg bg-gray-100 p-4">
      <h2 className="font-righteous flex lg:justify-center items-center text-xl pb-2 border-b-2 border-gray-400 border-dashed mb-4">
        <IoPersonOutline size="1.2em" className="mr-2" />
        Author
      </h2>
      <div className="flex gap-x-4 lg:block">
        <StaticImage
          className="flex-shrink-0 w-20 block mx-auto mb-4"
          src="../images/profile.jpg"
          alt="profile写真"
          as="figure"
          imgClassName="rounded-full"
          layout="fullWidth"
        />
        <div className="flex-grow">
          <p className="font-bold">morimorig3</p>
          <p className="text-gray-500 text-sm mb-2">
            JavaScriptが得意です。犬と読書と新しいものが好き。
          </p>
          <div className="flex gap-x-2">
            <a
              href={URL.github}
              className="text-gray-500 hover:text-github"
              target="_blank"
              rel="noreferrer"
            >
              <SiGithub size="1.5em" />
            </a>
            <a
              href={URL.twitter}
              className="text-gray-500 hover:text-twitter"
              target="_blank"
              rel="noreferrer"
            >
              <SiTwitter size="1.5em" />
            </a>
            <a
              href={URL.qiita}
              className="text-gray-500 hover:text-qiita"
              target="_blank"
              rel="noreferrer"
            >
              <SiQiita size="1.5em" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Bio;
