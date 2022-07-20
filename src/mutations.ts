export interface Mutation {
  selector: string;
  mountCallback?: (record: Element[]) => void;
  unmountCallback?: (record: Element[]) => void;
}

interface UseMutationsProps {
  store: any;
}

const data = {
  zoneName: "Test Zone",
  channelName: "Test Channel",
  watermarkHref: "https://doganbros.com",
  watermarkAria: "Octopus Watermark, Link to the Octopus Test Zone",
  avatarBgColor: "#966AEA",
  avatarFgColor: "#99FF69",
};

export const useMutations = ({ store }: UseMutationsProps): Mutation[] => {
  return [
    {
      selector: "#videospace a.leftwatermark",
      mountCallback: (e) => {
        const el = e[0] as HTMLElement;
        el.setAttribute("href", data.watermarkHref);
        el.setAttribute("aria-label", data.watermarkAria);
        el.style.width = "unset";
        el.style.height = "unset";
        el.style.display = "flex";
        el.style.textDecoration = "none";

        el.innerHTML += `
            <div style="text-align: left;padding-left: 16px;line-height: 1.25;display: flex;flex-direction: column;justify-content: center;">
              <div style="font-size: 24px; color: white;">
                ${data.channelName}
              </div>
              <div style="font-size: 16px; color: #7D4CDB;">
                ${data.zoneName}
              </div>
            </div>
        `;
        el.insertAdjacentHTML('afterend', `
            <div style="position: absolute; bottom: 32px; right: 32px; background-color: #00000088; padding: 16px; border-radius: 8px; z-index: 2;">
              <svg width="132" height="39" viewBox="0 0 132 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_0_12426)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M76.4756 23.1275C75.5477 23.6417 74.5358 23.8988 73.44 23.8988C72.3354 23.8988 71.4164 23.5807 70.6829 22.9445C70.4531 22.7528 70.2631 22.5371 70.1129 22.2974C69.9627 22.0578 69.8367 21.7441 69.7351 21.3562C69.6335 20.9684 69.5827 20.2299 69.5827 19.1405V13.807H67.4618V13.5717L71.9952 9.17947V11.6632H75.8526V13.807H71.9952V19.7026C71.9952 21.0795 72.574 21.768 73.7317 21.768C74.5977 21.768 75.5123 21.4804 76.4756 20.9052V23.1275ZM62.8753 23.8988C64.033 23.8988 65.2172 23.6766 66.4278 23.2321V20.8791C65.226 21.4107 64.1611 21.6765 63.2332 21.6765C61.9519 21.6765 60.9334 21.3148 60.1778 20.5915C59.4223 19.8682 59.0445 18.8921 59.0445 17.6633C59.0445 16.4956 59.3935 15.5347 60.0917 14.7809C60.7898 14.0271 61.6823 13.6502 62.7693 13.6502C63.8121 13.6502 64.9432 14.0336 66.1627 14.8005V12.2645C65.4292 11.9421 64.8129 11.722 64.3136 11.6044C63.8143 11.4867 63.2509 11.4279 62.6235 11.4279C60.8207 11.4279 59.367 12.0074 58.2624 13.1665C57.1578 14.3256 56.6054 15.8507 56.6054 17.7418C56.6054 19.6155 57.1732 21.11 58.3088 22.2255C59.4443 23.341 60.9665 23.8988 62.8753 23.8988ZM52.2466 22.1798C51.0552 23.3258 49.5554 23.8988 47.7472 23.8988C45.9981 23.8988 44.5363 23.3171 43.3618 22.1536C42.1873 20.9902 41.6001 19.537 41.6001 17.7941C41.6001 16.0337 42.1937 14.5674 43.3808 13.3953C44.568 12.2231 46.0572 11.6371 47.8486 11.6371C49.623 11.6371 51.0974 12.2275 52.2719 13.4083C53.4464 14.5892 54.0336 16.0729 54.0336 17.8594C54.0336 19.5937 53.4379 21.0338 52.2466 22.1798ZM83.6566 23.8988C85.4648 23.8988 86.9646 23.3258 88.156 22.1798C89.3474 21.0338 89.9431 19.5937 89.9431 17.8594C89.9431 16.0729 89.3558 14.5892 88.1813 13.4083C87.0068 12.2275 85.5324 11.6371 83.758 11.6371C81.9667 11.6371 80.4774 12.2231 79.2903 13.3953C78.1031 14.5674 77.5095 16.0337 77.5095 17.7941C77.5095 19.537 78.0968 20.9902 79.2713 22.1536C80.4457 23.3171 81.9075 23.8988 83.6566 23.8988ZM83.6857 21.3375C84.7385 21.3375 85.6117 21.0039 86.3054 20.3366C86.9991 19.6694 87.3459 18.8309 87.3459 17.8212C87.3459 16.781 87.004 15.9172 86.3201 15.2296C85.6363 14.5421 84.7779 14.1983 83.7447 14.1983C82.7018 14.1983 81.8347 14.5396 81.1435 15.222C80.4523 15.9045 80.1067 16.7582 80.1067 17.7831C80.1067 18.7979 80.4486 19.644 81.1324 20.3214C81.8162 20.9988 82.6673 21.3375 83.6857 21.3375ZM47.7763 21.3375C48.8291 21.3375 49.7023 21.0039 50.396 20.3366C51.0896 19.6694 51.4365 18.8309 51.4365 17.8212C51.4365 16.781 51.0946 15.9172 50.4107 15.2296C49.7269 14.5421 48.8684 14.1983 47.8353 14.1983C46.7924 14.1983 45.9253 14.5396 45.2341 15.222C44.5429 15.9045 44.1973 16.7582 44.1973 17.7831C44.1973 18.7979 44.5392 19.644 45.223 20.3214C45.9068 20.9988 46.7579 21.3375 47.7763 21.3375ZM95.4974 29.8205V23.389C96.4429 23.7288 97.3045 23.8988 98.0822 23.8988C99.8408 23.8988 101.288 23.3193 102.423 22.1602C103.559 21.0011 104.127 19.5196 104.127 17.7156C104.127 15.8071 103.524 14.3212 102.317 13.258C101.111 12.1948 99.4254 11.6632 97.2604 11.6632H93.0318V29.8205H95.4974ZM95.4974 21.2843C96.2397 21.6591 97.0173 21.8464 97.8304 21.8464C98.9615 21.8464 99.8872 21.4586 100.607 20.683C101.328 19.9074 101.688 18.9096 101.688 17.6895C101.688 16.9052 101.518 16.2123 101.177 15.611C100.837 15.0097 100.373 14.5718 99.7856 14.2972C99.1979 14.0227 98.3385 13.8855 97.2073 13.8855H95.4974V21.2843ZM110.808 23.8988C111.462 23.8988 112.118 23.7463 112.776 23.4413C113.434 23.1362 114.02 22.7092 114.532 22.1602V23.6896H116.945V11.6632L114.532 13.38V20.2647C113.728 21.3715 112.752 21.9249 111.603 21.9249C110.684 21.9249 110.041 21.6743 109.674 21.1732C109.307 20.6721 109.124 19.7898 109.124 18.5261V11.6632L106.712 13.38V18.5523C106.712 20.0599 106.877 21.1384 107.209 21.7876C107.54 22.4369 108.031 22.9511 108.68 23.3301C109.33 23.7092 110.039 23.8988 110.808 23.8988ZM126.827 22.9511C126.045 23.5829 125.04 23.8988 123.811 23.8988C123.087 23.8988 122.442 23.8225 121.876 23.67C121.31 23.5175 120.599 23.2365 119.742 22.8269V20.2647C120.422 20.7353 121.118 21.1166 121.83 21.4085C122.541 21.7005 123.14 21.8464 123.626 21.8464C124.129 21.8464 124.562 21.7244 124.925 21.4804C125.287 21.2364 125.468 20.9445 125.468 20.6046C125.468 20.256 125.351 19.9662 125.117 19.7353C124.883 19.5043 124.377 19.171 123.599 18.7353C122.044 17.8812 121.025 17.1513 120.544 16.5457C120.062 15.94 119.821 15.2798 119.821 14.5652C119.821 13.6415 120.186 12.8876 120.915 12.3037C121.644 11.7198 122.583 11.4279 123.732 11.4279C124.925 11.4279 126.149 11.7591 127.404 12.4214V14.7744C125.972 13.9203 124.801 13.4933 123.891 13.4933C123.423 13.4933 123.045 13.5913 122.758 13.7874C122.47 13.9835 122.327 14.2428 122.327 14.5652C122.327 14.8441 122.457 15.1099 122.718 15.3626C122.978 15.6154 123.436 15.9204 124.09 16.2777L124.951 16.7614C126.984 17.8943 128 19.1492 128 20.5262C128 21.5109 127.609 22.3192 126.827 22.9511Z" fill="white"/>
                </g>
                <path d="M2 27.1129V14.9925C2 7.81692 7.81693 2 14.9925 2V2C22.168 2 27.9849 7.81692 27.9849 14.9925V29.0618" stroke="white" stroke-width="3.24" stroke-linecap="round"/>
                <ellipse cx="11.0499" cy="13.9501" rx="2.15048" ry="2.13144" fill="white"/>
                <ellipse cx="18.9351" cy="13.9501" rx="2.15048" ry="2.13144" fill="white"/>
                <path d="M21.3398 22.4262V28.8674C21.3398 32.6009 24.3664 35.6274 28.0998 35.6274V35.6274" stroke="white" stroke-width="3.24" stroke-linecap="round"/>
                <path d="M8.49645 22.4262L8.54886 26.6629C8.59398 30.3113 5.64888 33.2931 2.00022 33.2931V33.2931" stroke="white" stroke-width="3.24" stroke-linecap="round"/>
                <path d="M14.9923 23.4294L14.9027 37" stroke="white" stroke-width="3.24" stroke-linecap="round"/>
                <defs>
                <filter id="filter0_d_0_12426" x="37.6001" y="5.17947" width="94.3999" height="28.641" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset/>
                <feGaussianBlur stdDeviation="2"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_12426"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_12426" result="shape"/>
                </filter>
                </defs>
              </svg>
            </div>
        `)
      },
    },
    {
      selector: "#videospace div.leftwatermark",
      mountCallback: (e) => {
        const el = e[0] as HTMLElement;
        el.style.backgroundImage = "none";
        el.style.width = "60px";
        el.style.height = "60px";
        el.style.maxWidth = "unset";
        el.style.maxHeight = "unset";
        el.style.borderRadius = "76px";
        el.style.display = "flex";
        el.style.alignItems = "center";
        el.style.justifyContent = "center";
        el.style.fontSize = "24px";
        el.style.fontWeight = "400";
        el.style.backgroundColor = data.avatarBgColor;
        el.style.color = data.avatarFgColor;
        el.innerText = data.zoneName
          .split(" ")
          .map((c) => c[0])
          .join("");
      },
    },
  ];
};