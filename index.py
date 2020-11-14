import discord, urllib.request, os, sys, time, requests, json, bs4, urlextract, sqlite3, re, pathlib, logging, youtube_dl, asyncio, random, math, pokepy, pymysql
from discord.ext import commands
from urllib import parse
from urllib.request import Request, urlopen
from urllib.parse import quote
from bs4 import BeautifulSoup
from mcstatus import MinecraftServer
import discord.ext.commands as commands
import xml.etree.ElementTree as ET

kakao_key = "dc882c632eae47df69726c5b1a87aa4f"
prefix = "존비야"
client = discord.Client()
opggsummonersearch = 'https://www.op.gg/summoner/userName='
r6URL = "https://r6stats.com"
playerSite = 'https://www.r6stats.com/search/'
gaming_list = []
tictactoe = {}
client_id = "YeOVJk0bK59ryYiRDIiY"
client_secret = "ZBHDeMCaMe"
GOOGLE_API_KEY = 'AIzaSyDSzYG1Joo4lCEHEWN2YzYwTyIkmrbYIk4'

@client.event
async def on_ready():
    print('로그인 완료')

@client.event
async def on_message(message):
    if message.author.bot: return
    if message.content == f'{prefix} 문자감지':
        if len(message.attachments):
            try:
                text = await message.attachments[0].read()
                textrecog = text_recognize(kakao_key, text, text_detect(kakao_key, text))
            except Exception as ex:
                if str(ex).startswith('400 Client Error'):
                    await message.channel.send('우어.. 문자 감지를 실패했다..')
                else:
                    await message.channel.send(f'에러...:\n{ex}')
            else:
                recogtext = []
                for onebox in textrecog:
                    if onebox != '':
                        recogtext.append(onebox)
                textder_str = '`, `'.join(recogtext)
                if textder_str == '':
                	await message.channel.send('우어.. 문자 감지를 실패했다..')
                	return
                #end_time = time.time()
                embed = discord.Embed(description=f'감지된 문자\n\n`{textder_str}`')
                embed.set_thumbnail(url=message.attachments[0].url)
                embed.set_footer(text=message.author, icon_url=message.author.avatar_url)
                await message.channel.send(embed=embed)
        else:
            await message.channel.send('우어.. 이미지 제대로 올려라..')
    if message.content.startswith(f"{prefix} 날씨"):
        if message.content[6:] == '' or message.content[6:] == "": return await message.channel.send('우어.. 날씨 지역을 입력해라..')
        try:
            enc_location = parse.quote(message.content[6:]+'날씨')
            hdr = {'User-Agent': 'Mozilla/5.0'}
            url = f'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query={enc_location}'
            req = Request(url, headers=hdr)
            html = urlopen(req)
            bsObj = bs4.BeautifulSoup(html, "html.parser")
            todayBase = bsObj.find('div', {'class': 'main_info'})

            todayTemp1 = todayBase.find('span', {'class': 'todaytemp'})
            todayTemp = todayTemp1.text.strip()  # 온도

            todayValueBase = todayBase.find('ul', {'class': 'info_list'})
            todayValue2 = todayValueBase.find('p', {'class': 'cast_txt'})
            todayValue = todayValue2.text.strip()  # 밝음,어제보다 ?도 높거나 낮음을 나타내줌

            todayFeelingTemp1 = todayValueBase.find('span', {'class': 'sensible'})
            todayFeelingTemp = todayFeelingTemp1.text.strip()  # 체감온도

            todayMiseaMongi1 = bsObj.find('div', {'class': 'sub_info'})
            todayMiseaMongi2 = todayMiseaMongi1.find('div', {'class': 'detail_box'})
            todayMiseaMongi3 = todayMiseaMongi2.find('dd')
            todayMiseaMongi = todayMiseaMongi3.text  # 미세먼지

            tomorrowBase = bsObj.find('div', {'class': 'table_info weekly _weeklyWeather'})
            tomorrowTemp1 = tomorrowBase.find('li', {'class': 'date_info'})
            tomorrowTemp2 = tomorrowTemp1.find('dl')
            tomorrowTemp3 = tomorrowTemp2.find('dd')
            tomorrowTemp = tomorrowTemp3.text.strip()  # 오늘 오전,오후온도

            tomorrowAreaBase = bsObj.find('div', {'class': 'tomorrow_area'})
            tomorrowMoring1 = tomorrowAreaBase.find('div', {'class': 'main_info morning_box'})
            tomorrowMoring2 = tomorrowMoring1.find('span', {'class': 'todaytemp'})
            tomorrowMoring = tomorrowMoring2.text.strip()  # 내일 오전 온도

            tomorrowValue1 = tomorrowMoring1.find('div', {'class': 'info_data'})
            tomorrowValue = tomorrowValue1.text.strip()  # 내일 오전 날씨상태, 미세먼지 상태

            tomorrowAreaBase = bsObj.find('div', {'class': 'tomorrow_area'})
            tomorrowAllFind = tomorrowAreaBase.find_all('div', {'class': 'main_info morning_box'})
            tomorrowAfter1 = tomorrowAllFind[1]
            tomorrowAfter2 = tomorrowAfter1.find('p', {'class': 'info_temperature'})
            tomorrowAfter3 = tomorrowAfter2.find('span', {'class': 'todaytemp'})
            tomorrowAfterTemp = tomorrowAfter3.text.strip()  # 내일 오후 온도

            tomorrowAfterValue1 = tomorrowAfter1.find('div', {'class': 'info_data'})
            tomorrowAfterValue = tomorrowAfterValue1.text.strip()

            embed = discord.Embed(
            title=message.content[6:]+ ' 날씨 정보',
            description=message.content[6:]+ '날씨 정보입니다.',
            colour=discord.Colour.blue()
            )
            embed.add_field(name='현재온도', value=todayTemp+'˚', inline=False)  # 현재온도
            embed.add_field(name='체감온도', value=todayFeelingTemp, inline=False)  # 체감온도
            embed.add_field(name='현재상태', value=todayValue, inline=False)  # 밝음,어제보다 ?도 높거나 낮음을 나타내줌
            embed.add_field(name='현재 미세먼지 상태', value=todayMiseaMongi, inline=False)  # 오늘 미세먼지
            embed.add_field(name='오늘 오전/오후 날씨', value=tomorrowTemp, inline=False)  # 오늘날씨 # color=discord.Color.blue()
            embed.add_field(name='**----------------------------------**',value='**----------------------------------**', inline=False)  # 구분선
            embed.add_field(name='내일 오전온도', value=tomorrowMoring+'˚', inline=False)  # 내일오전날씨
            embed.add_field(name='내일 오전 날씨 상태, 미세먼지 상태', value=tomorrowValue, inline=False)  # 내일오전 날씨상태
            embed.add_field(name='내일 오후온도', value=tomorrowAfterTemp + '˚', inline=False)  # 내일오후날씨
            embed.add_field(name='내일 오후 날씨 상태, 미세먼지 상태', value=tomorrowAfterValue, inline=False)  # 내일오후 날씨상태


            await message.channel.send(embed=embed)
        except Exception as ex:
            return await message.channel.send(f'에러남.\n{ex}')
    if message.content.startswith(f"{prefix} 타이머"):
        try:
            timer = message.content.split()[2]
            story = message.content.split(" ", maxsplit=3)[3]
            if not timer: return await message.channel.send("시간을 적어주세요.")
            if story:
                if(len(story) > 1000): return await message.channel.send('이런 타이머 끝난 뒤에 받을 메세지가 1000자가 넘네요!')
            if int(timer) <= 0: return await message.channel.send('0초 또는 음수는 안되요..')
            if str(timer) in '.': return await message.channel.send('소수 안됨')
            await message.channel.send(f'{timer}초 뒤에 멘션이 옵니다.\n(봇 꺼지면 안 옴)')
            await asyncio.sleep(int(timer))
            if story: return await message.channel.send(f'<@{message.author.id}>님 **{story}**(이)라고 님이 시킴.(참고: {timer}초)')
            await message.channel.send(f'<@{message.author.id}>님아 시간이 다 됬음.(참고: {timer}초)')
        except Exception as ex: return await message.channel.send('에러남..\n %s'%(ex))
    if message.content == f'{prefix} 지진':
        r = requests.get('https://m.kma.go.kr/m/eqk/eqk.jsp?type=korea').text
        soup = BeautifulSoup(r, "html.parser")
        table = soup.find("table", {"class": "table02 style01"})
        td = table.find_all("td")

        date = earthquake(td[1])
        gyumo = earthquake(td[3])
        jindo = earthquake(td[5])
        location = earthquake(td[7])
        depth = earthquake(td[9])
        detail = earthquake(td[10])

        embed = discord.Embed(description=date, color=discord.Colour.dark_blue())
        try:
            img = soup.find("div", {"class": 'img-center'}).find("img")["src"]
            img = f"http://m.kma.go.kr{img}"
            if img is None:pass
            else: embed.set_image(url=img)
        except: pass

        embed.add_field(name="규모", value=gyumo, inline=True)
        embed.add_field(name="발생위치", value=location, inline=True)
        embed.add_field(name="발생깊이", value=depth, inline=True)
        embed.add_field(name="진도", value=jindo, inline=True)
        embed.add_field(name="참고사항", value=detail, inline=True)
        embed.set_footer(text="기상청")

        await message.channel.send(embed=embed)
    if message.content.startswith(f"{prefix} 카트"):
        try:
            response = requests.get('http://kart.nexon.com/Garage/Main?strRiderID='+message.content[6:])
            response2 = requests.get('http://kart.nexon.com/Garage/Record?strRiderID='+message.content[6:])
            
            readerhtml = response.text
            readerhtml2 = response2.text
            
            soup = BeautifulSoup(readerhtml, 'lxml')
            soup2 = BeautifulSoup(readerhtml2, 'lxml')

            #차고1#
            nick = soup.find('span', {'id' : 'RiderName'}).text #닉네임
            club = soup.find('span', {'id' : 'GuildName'}).text #클럽
            rprank = soup.find('span',{'class' : 'RecordData1'}).text #RP 순위
            rp = soup.find('span',{'class' : 'RecordData2'}).text #RP
            avatar = soup.find('div', {'id' : 'CharInfo'}) #avatar.png
            avatar2 = avatar.find('img').get('src') #avatar.png표시
            
            #차고2#
            cnt = soup2.find('div', {'id' : 'CntRecord2'}) #차고 메인 전체 크롤링
            dlfind = cnt.findAll('dl') #dl태그 찾기
            starty = dlfind[0].find('dd').text[0:4] #게임시작 년
            startm = dlfind[0].find('dd').text[5:7] #게임시작 월
            startd = dlfind[0].find('dd').text[8:10] #게임시작 일
            startday = dlfind[0].find('dd').text[11:] #게임 시작후 지금까지 일
            racing = dlfind[1].find('dd').text #게임시간
            gameon = dlfind[2].find('dd').text #게임 실행
            recenty = dlfind[3].find('dd').text[0:4] #최근 실행 년
            recentm = dlfind[3].find('dd').text[5:7] #최근 실행 월
            recentd = dlfind[3].find('dd').text[8:10] #최근실행 일

            #전체 승률#
            recorddata2 = soup2.find('div', {'id' : 'CntRecord'}) #승률창 크롤링
            allwinrate = recorddata2.find('td',{'class' : 'RecordL2'}).text[0:3] #전체승률 %
            allwin = recorddata2.find('td',{'class' : 'RecordL2'}).text[4:] #전체 전적
            allwinrp = recorddata2.find('td',{'class' : 'RecordL3'}).text #전체 RP 랭킹
            
            #스피드#
            winrate = recorddata2.find('table', {'class' : 'RecordL'}) #스피드 크롤링
            sprate = winrate.findAll('td') #스피드전적창에서 td찾기
            spallrt = sprate[4].text[0:3] #스피드 전체 %
            spallrt2 = sprate[4].text[4:] #스피드 전체 전적
            sprprank = sprate[5].text #스피드 RP 랭킹
            
            #아이템#
            iprallrt = sprate[7].text[0:3] #스피드 크롤링과 같은 클래스 아이템 전체 %
            iprallrt2 = sprate[7].text[4:] #아이템 전체 전적
            iprprank = sprate[8].text #아이템 RP 랭킹
            
            #출력#
            embed = discord.Embed(color=0x900020, title = message.content[6:]) #버건디 컬러 embed + 닉네임
            embed.add_field(name = "NickName", value = nick, inline = True) #닉네임 출력
            embed.add_field(name = "Club", value = club, inline = True) #클럽 출력
            embed.add_field(name = "RP", value = rprank + "\n" + rp, inline = True) #RP순위와 RP출력
            embed.add_field(name = "All Win Rate", value = allwinrate + "\n" + "(" + allwin + ")", inline = True) #전체승률 출력
            embed.add_field(name = "Speed Win Rate", value = spallrt + "\n" + "(" + spallrt2 + ")", inline = True) #스피드 승률 출력
            embed.add_field(name = "Item Win Rate", value = iprallrt + "\n" + "(" + iprallrt2 + ")", inline = True) #아이템 승률 출력
            embed.add_field(name = "All RP", value = allwinrp, inline = True) #전체 RP 출력
            embed.add_field(name = "Speed RP", value = sprprank, inline = True) #스피드 RP 출력
            embed.add_field(name = "Item RP", value = iprprank, inline = True) #아이템 RP 출력
            embed.add_field(name = "Rider Creation", value = f'{starty}년 '+f'{startm}월 '+f'{startd}일' "\n" + startday, inline = True)
            #게임시작일 출력
            embed.add_field(name = "Driving Time", value = racing, inline = True) #주행시간 출력
            embed.add_field(name = "Game Runs", value = gameon, inline = True) #게임 실행 횟수 출력
            embed.add_field(name = "Recent Access", value = f'{recenty}년 '+f'{recentm}월 '+f'{recentd}일') #게임 최근 접속일 출력
            embed.add_field(name="TMI",value=f'[KartRiderTMI](https://tmi.nexon.com/kart/user?nick={nick})') #카트라이더 TMI 연결
            embed.set_footer(text="Source - NextHeroes\nLv2 S2 KartRiderClub NextLv's Bot") #만든 사람
            embed.set_thumbnail(url = avatar2) #avatar.png 출력
            await message.channel.send(embed=embed) #embed 
        except Exception as ex: await message.channel.send('에러가 났네요^^\n{}'.format(ex))
    
    if message.content.startswith(f"{prefix} 롤전적"):
        playerNickname = message.content[7:]
        checkURLBool = urlopen('https://www.op.gg/summoner/userName=' + quote(playerNickname))
        bs = bs4.BeautifulSoup(checkURLBool, 'html.parser')

        RankMedal = bs.findAll('img', {'src': re.compile('\/\/[a-z]*\-[A-Za-z]*\.[A-Za-z]*\.[A-Za-z]*\/[A-Za-z]*\/[A-Za-z]*\/[a-z0-9_]*\.png')})

        mostUsedChampion = bs.find('div', {'class': 'ChampionName'})
        mostUsedChampionKDA  = bs.find('span', {'class': 'KDA'})

        if playerNickname == '':
            embed = discord.Embed(title="소환사 이름이 입력되지 않았습니다!", color=discord.Colour.blue())
            return await message.channel.send(embed=embed)
        elif len(deleteTags(bs.findAll('h2', {'class': 'Title'}))) != 0:
            embed = discord.Embed(title="존재하지 않는 소환사", description="", color=discord.Colour.gold())
            return await message.channel.send(embed=embed)
        else:
            try:
                solorank_Types_and_Tier_Info = deleteTags(bs.findAll('div', {'class': {'RankType', 'TierRank'}}))
                solorank_Point_and_winratio = deleteTags(bs.findAll('span', {'class': {'LeaguePoints', 'wins', 'losses', 'winratio'}}))
                flexrank_Types_and_Tier_Info = deleteTags(bs.findAll('div', {'class': {'sub-tier__rank-type', 'sub-tier__rank-tier', 'sub-tier__league-point', 'sub-tier__gray-text'}}))
                flexrank_Point_and_winratio = deleteTags(bs.findAll('span', {'class': {'sub-tier__gray-text'}}))
                if len(solorank_Point_and_winratio) == 0 and len(flexrank_Point_and_winratio) == 0:
                    embed = discord.Embed(title="소환사 전적검색", description="", color=discord.Colour.dark_gray())
                    embed.add_field(name="Summoner Search From op.gg", value=opggsummonersearch + playerNickname,inline=False)
                    embed.add_field(name="Ranked Solo : Unranked", value="Unranked", inline=False)
                    embed.add_field(name="Flex 5:5 Rank : Unranked", value="Unranked", inline=False)
                    embed.set_thumbnail(url='https:' + RankMedal[0]['src'])
                    embed.set_footer(text='소스 출처: hands8142(Github User)')
                    await message.channel.send("소환사 " + playerNickname + "님의 전적", embed=embed)
                elif len(solorank_Point_and_winratio) == 0:
                    mostUsedChampion = bs.find('div', {'class': 'ChampionName'})
                    mostUsedChampion = mostUsedChampion.a.text.strip()
                    mostUsedChampionKDA = bs.find('span', {'class': 'KDA'})
                    mostUsedChampionKDA = mostUsedChampionKDA.text.split(':')[0]
                    mostUsedChampionWinRate = bs.find('div', {'class': "Played"})
                    mostUsedChampionWinRate = mostUsedChampionWinRate.div.text.strip()
                    FlexRankTier = flexrank_Types_and_Tier_Info[0] + ' : ' + flexrank_Types_and_Tier_Info[1]
                    FlexRankPointAndWinRatio = flexrank_Types_and_Tier_Info[2] + " /" + flexrank_Types_and_Tier_Info[-1]

                    embed = discord.Embed(title="소환사 전적검색", description="", color=discord.Colour.blue())
                    embed.add_field(name="Summoner Search From op.gg", value=opggsummonersearch + playerNickname, inline=False)
                    embed.add_field(name="Ranked Solo : Unranked", value="Unranked", inline=False)
                    embed.add_field(name=FlexRankTier, value=FlexRankPointAndWinRatio, inline=False)
                    embed.add_field(name="Most Used Champion : " + mostUsedChampion, value="KDA : " + mostUsedChampionKDA + " / " + " WinRate : " + mostUsedChampionWinRate, inline=False)
                    embed.set_thumbnail(url='https:' + RankMedal[1]['src'])
                    embed.set_footer(text='소스 출처: hands8142(Github User)')
                    await message.channel.send("소환사 " + playerNickname + "님의 전적", embed=embed)
                elif len(flexrank_Point_and_winratio) == 0:
                    mostUsedChampion = bs.find('div', {'class': 'ChampionName'})
                    mostUsedChampion = mostUsedChampion.a.text.strip()
                    mostUsedChampionKDA = bs.find('span', {'class': 'KDA'})
                    mostUsedChampionKDA = mostUsedChampionKDA.text.split(':')[0]
                    mostUsedChampionWinRate = bs.find('div', {'class': "Played"})
                    mostUsedChampionWinRate = mostUsedChampionWinRate.div.text.strip()
                    SoloRankTier = solorank_Types_and_Tier_Info[0] + ' : ' + solorank_Types_and_Tier_Info[1]
                    SoloRankPointAndWinRatio = solorank_Point_and_winratio[0] + "/ " + solorank_Point_and_winratio[1] + " " + solorank_Point_and_winratio[2] + " /" + solorank_Point_and_winratio[3]

                    embed = discord.Embed(title="소환사 전적검색", description="", color=discord.Colour.blue())
                    embed.add_field(name="Summoner Search From op.gg", value=opggsummonersearch + playerNickname, inline=False)
                    embed.add_field(name=SoloRankTier, value=SoloRankPointAndWinRatio, inline=False)
                    embed.add_field(name="Flex 5:5 Rank : Unranked", value="Unranked", inline=False)
                    embed.add_field(name="Most Used Champion : " + mostUsedChampion, value="KDA : " + mostUsedChampionKDA + " / " + "WinRate : " + mostUsedChampionWinRate, inline=False)
                    embed.set_thumbnail(url='https:' + RankMedal[0]['src'])
                    embed.set_footer(text='소스 출처: hands8142(Github User)')
                    await message.channel.send("소환사 " + playerNickname + "님의 전적", embed=embed)
                else:
                    solorankmedal = RankMedal[0]['src'].split('/')[-1].split('?')[0].split('.')[0].split('_')
                    flexrankmedal = RankMedal[1]['src'].split('/')[-1].split('?')[0].split('.')[0].split('_')
                    SoloRankTier = solorank_Types_and_Tier_Info[0] + ' : ' + solorank_Types_and_Tier_Info[1]
                    SoloRankPointAndWinRatio = solorank_Point_and_winratio[0] + "/ " + solorank_Point_and_winratio[1] + " " + solorank_Point_and_winratio[2] + " /" + solorank_Point_and_winratio[3]
                    FlexRankTier = flexrank_Types_and_Tier_Info[0] + ' : ' + flexrank_Types_and_Tier_Info[1]
                    FlexRankPointAndWinRatio = flexrank_Types_and_Tier_Info[2] + " /" + flexrank_Types_and_Tier_Info[-1]
                    mostUsedChampion = bs.find('div', {'class': 'ChampionName'})
                    mostUsedChampion = mostUsedChampion.a.text.strip()
                    mostUsedChampionKDA = bs.find('span', {'class': 'KDA'})
                    mostUsedChampionKDA = mostUsedChampionKDA.text.split(':')[0]
                    mostUsedChampionWinRate = bs.find('div', {'class': "Played"})
                    mostUsedChampionWinRate = mostUsedChampionWinRate.div.text.strip()
                    cmpTier = tierCompare(solorankmedal[0], flexrankmedal[0])
                    embed = discord.Embed(title="소환사 전적검색", description="", color=discord.Colour.blue())
                    embed.add_field(name="Summoner Search From op.gg", value=opggsummonersearch + playerNickname, inline=False)
                    embed.add_field(name=SoloRankTier, value=SoloRankPointAndWinRatio, inline=False)
                    embed.add_field(name=FlexRankTier, value=FlexRankPointAndWinRatio, inline=False)
                    embed.set_footer(text='소스 출처: hands8142(Github User)')
                    embed.add_field(name="Most Used Champion : " + mostUsedChampion, value="KDA : " + mostUsedChampionKDA + " / " + " WinRate : " + mostUsedChampionWinRate, inline=False)
                    
                    if cmpTier == 0:
                        embed.set_thumbnail(url='https:' + RankMedal[0]['src'])
                    elif cmpTier == 1:
                        embed.set_thumbnail(url='https:' + RankMedal[1]['src'])
                    else:
                        if solorankmedal[1] > flexrankmedal[1]:
                            embed.set_thumbnail(url='https:' + RankMedal[0]['src'])
                        elif solorankmedal[1] < flexrankmedal[1]:
                            embed.set_thumbnail(url='https:' + RankMedal[0]['src'])
                        else:
                            embed.set_thumbnail(url='https:' + RankMedal[0]['src'])
                    await message.channel.send("소환사 " + playerNickname + "님의 전적", embed=embed)
                
            except Exception as e:
                await message.channel.send(f'😥 에러가 났습니다..(주륵)\n{e}')

    if message.content == f"{prefix} 뉴스":
        html = urllib.request.urlopen('https://news.naver.com/')
        bsObj = bs4.BeautifulSoup(html, "html.parser")
        news = bsObj.select('#today_main_news > div.hdline_news > ul > li > div.hdline_article_tit > a')
        str_ = ''
        for a in news:
            str_ += f'`{a.text.strip()}`\n\n'
        
        await message.channel.send(str_)

    if message.content == f"{prefix} 유명인":
        if not len(message.attachments): return await message.channel.send('우어.. 이미지 제대로 올려라..')
        try:
            text = await message.attachments[0].read()
            files = {'image': text}
            headers = {"X-Naver-Client-Id": 'Zf95N7IPgvO8Sj_FM4hv', "X-Naver-Client-Secret": '9AMXsj3CQo'}
            response = requests.post('https://openapi.naver.com/v1/vision/celebrity',  files=files, headers=headers)
            rescode = response.status_code
            if(rescode==200):
                result = json.loads(response.text)
                embed = discord.Embed(description='인식한 유명인(신뢰도: {}%)\n\n**이름**\n{}'.format(round(result['faces'][0]['celebrity']['confidence'] * 100, 2), result['faces'][0]['celebrity']['value']), colour=discord.Colour.blue())
                embed.set_footer(text='정확하지 않을 수 있음', icon_url=message.author.avatar_url)
                await message.channel.send(embed=embed)
            else:
                await message.channel.send('에러 코드\n{}'.format(rescode))
        except Exception as ex: return await message.channel.send('에러남.\n{}'.format(ex))

    if message.content.startswith(f"{prefix} pyeval"):
        if message.author.id != 674877162557407242: return await message.channel.send("봇 주인만 가능!")
        if message.content[11:] == '' or message.content[11:] == " ":
            await message.channel.send('`존비야 pyeval <PY_command>`')
            return
        try:
            embed = discord.Embed(title='python eval', description='**📥 Input: **\n```py\n{}```\n**📤 Output: **\n```py\n{}\n```'.format(message.content[11:], eval(message.content[11:])))
            embed.set_footer(text=message.author, icon_url=message.author.avatar_url)
            await message.channel.send(embed=embed)
        except Exception as ex:
            embed = discord.Embed(title='python eval Error...', description='**📥 Input: **\n```py\n{}```\n**📤 Output: **\n```py\n{}\n```'.format(message.content[11:], ex))
            embed.set_footer(text=message.author, icon_url=message.author.avatar_url)
            await message.channel.send(embed=embed)

    if message.content == f'{prefix} 업다운':
        if await is_gaming(message): return
        gaming_list.append(message.author.id)
        correct = random.randint(1, 50)
        count = 5
        log = ''
        embed = discord.Embed(title="업다운", description="5번의 기회만 주어집니다. 신중히 선택해주세요! \n**1~%s**안의 숫자를 입력해주세요."%(50))
        embed.set_footer(text="게임을 그만하려면 '취소'를 입력하세요.")
        try:
            msg = await message.channel.send(embed=embed)

            while count > 0:
                def check_updown_input(m):
                    try:
                        int(m.content)
                        return (
                            m.channel == message.channel
                            and m.author == message.author
                            and int(m.content) in list(range(1, 50+1))
                        )
                    except:
                        if (m.channel == message.channel and m.author == message.author and m.content == '취소'):return True
                        else:return False
            
                user_input = await client.wait_for("message", check=check_updown_input, timeout=30)

                try:
                    await user_input.delete()
                except: pass

                if user_input.content == f'취소':
                    embed = discord.Embed(title="게임 취소됨", description="게임이 취소되었습니다!")
                    await message.channel.send(embed=embed)
                    break
                else:
                    if (int(user_input.content)) == correct:
                        embed = discord.Embed(title="정답이에요!", description="축하해요! 정답입니다!")
                        await message.channel.send(embed=embed)
                        break
                    elif int(user_input.content) > correct:
                        count -= 1
                        embed = discord.Embed(description="입력하신 숫자보다 정답이 낮아요! %s회 남았어요." % (str(count)))
                        await message.channel.send(embed=embed)
                        log += '%s - 🔽 Down\n'%(user_input.content)
                        embed = discord.Embed(title="업다운", description="%s번의 기회가 남았습니다! 신중히 선택해주세요! \n**1~%s**안의 숫자를 입력해주세요.\n\n%s"%(int(count), 50, log))
                        embed.set_footer(text="게임을 그만하려면 '%s 취소'를 입력하세요."%(prefix))
                        await msg.edit(embed=embed)
                    elif int(user_input.content) < correct:
                        count -= 1
                        embed = discord.Embed(description="입력하신 숫자보다 정답이 높아요! %s회 남았어요." % (str(count)))
                        await message.channel.send(embed=embed)
                        log += '%s - 🔼 Up\n'%(user_input.content)
                        embed = discord.Embed(title="업다운", description="%s번의 기회가 남았습니다! 신중히 선택해주세요! \n**1~%s**안의 숫자를 입력해주세요.\n\n%s"%(int(count), 50, log))
                        embed.set_footer(text="게임을 그만하려면 '%s 취소'를 입력하세요."%(prefix))
                        await msg.edit(embed=embed)
                    if count == 0:
                        embed = discord.Embed(description="5번 안에 답을 맞추지 못 했네요.. 답은 %s였어요!\n\n%s" % (str(correct), log))
                        await message.channel.send(embed=embed)

            gaming_list.remove(message.author.id)
        except Exception as ex:
            gaming_list.remove(message.author.id)
            await message.channel.send('게임에 오류가 발생하여 게임을 중지했습니다..\n{}'.format(ex))
    
    if message.content == f'{prefix} 캡챠':
        code = "0"
        url = f"https://openapi.naver.com/v1/captcha/nkey?code={code}"
        request = urllib.request.Request(url)
        request.add_header("X-Naver-Client-Id", client_id)
        request.add_header("X-Naver-Client-Secret", client_secret)
        response = urllib.request.urlopen(request)
        rescode = response.getcode()
        if rescode == 200:
            response_body = response.read()
            key = response_body.decode('utf-8')
            key = json.loads(key)
            key = key['key']
            url = "https://openapi.naver.com/v1/captcha/ncaptcha.bin?key=" + key
            request = urllib.request.Request(url)
            request.add_header("X-Naver-Client-Id", client_id)
            request.add_header("X-Naver-Client-Secret", client_secret)
            response = urllib.request.urlopen(request)
            rescode = response.getcode()
            if rescode == 200:
                response_body = response.read()
                name = str(message.author.id) + '.png'
                with open(name, 'wb') as f:
                    f.write(response_body)
                await message.channel.send(file=discord.File(str(message.author.id) + '.png'))

                def check(msg):
                    return msg.author == message.author and msg.channel == message.channel

                try:
                    msg = await client.wait_for("message", timeout=60, check=check)
                except:
                    await message.channel.send("시간초과입니다.")
                    return

                code = "1"
                value = msg.content
                url = "https://openapi.naver.com/v1/captcha/nkey?code=" + code + "&key=" + key + "&value=" + str(quote(value))
                request = urllib.request.Request(url)
                request.add_header("X-Naver-Client-Id", client_id)
                request.add_header("X-Naver-Client-Secret", client_secret)
                response = urllib.request.urlopen(request)
                rescode = response.getcode()
                if (rescode == 200):
                    response_body = response.read()
                    sid = response_body.decode('utf-8')
                    answer = json.loads(sid)
                    answer = answer['result']
                    time = json.loads(sid)
                    time = time['responseTime']
                    if str(answer) == 'True':
                        await message.channel.send("정답입니다. 걸린시간:" + str(time) + '초')
                    if str(answer) == 'False':
                        await message.channel.send("틀리셨습니다. 걸린시간:" + str(time) + '초')
                else:
                    print("Error Code:" + rescode)
            else:
                print("Error Code:" + rescode)
        else:
            print("Error Code:" + rescode)
    
    if message.content == f'{prefix} 지뢰찾기' or message.content == f'{prefix} 지뢰':
        init_map = [
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '']
        ]
        zz = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '🟧', '🟪', ':bomb:']
        now_map = zzz(init_map, zz)
        c = 0
        for i in range(7):
            for j in range(7):
                if now_map[i][j] in '||:bomb:||':
                    c += 1

        await message.channel.send(embed=discord.Embed(description=f"지뢰 갯수: {c}개\n{get_playlist(now_map)}", color=discord.Colour.blue()).set_footer(text="스포일러를 클릭해주세요!"))

    if message.content.startswith(f'{prefix} 포켓검색') or message.content.startswith(f'{prefix} 포켓몬'):
        try:
            PoketmonNickName = message.content[8:]
            if PoketmonNickName == '' or PoketmonNickName == ' ': return await message.channel.send('뒤에다가 포켓몬 이름을 영어로 적어라..')
            pokemon = pokepy.V2Client().get_pokemon(str(PoketmonNickName))
            embed = discord.Embed(title=pokemon.name, color=discord.Colour.dark_green()).set_thumbnail(url=f"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{pokemon.id}.png").add_field(name='체력', value=str(pokemon.stats[0].base_stat), inline=True)
            embed.add_field(name="공격력", value=str(pokemon.stats[1].base_stat), inline=True)
            embed.add_field(name="방어력", value=str(pokemon.stats[2].base_stat), inline=True)
            embed.add_field(name="특수 공격", value=str(pokemon.stats[3].base_stat), inline=True)
            embed.add_field(name="특수 방어", value=str(pokemon.stats[4].base_stat), inline=True)
            embed.add_field(name="스피드", value=str(pokemon.stats[5].base_stat), inline=True)
            embed.add_field(name="타입", value=", ".join(ty.type.name for ty in pokemon.types), inline=True)
            await message.channel.send(embed=embed)
        except Exception as ex: await message.channel.send(f'에러남.\n{ex}')
    
    if message.content.startswith(f'{prefix} 메이플'):
        try:
            mapleLink = "https://maplestory.nexon.com"
            mapleCharacterSearch = "https://maplestory.nexon.com/Ranking/World/Total?c="
            mapleUnionLevelSearch = "https://maplestory.nexon.com/Ranking/Union?c="
            playerNickname = ''.join((message.content).split(' ')[2:])
            html = urlopen(mapleCharacterSearch + quote(playerNickname))
            bs = BeautifulSoup(html, 'html.parser')
            html2 = urlopen(mapleUnionLevelSearch + quote(playerNickname))
            bs2 = BeautifulSoup(html2,'html.parser')

            if len(message.content.split(" ")) == 2:
                embed = discord.Embed(title="닉네임이 입력되지 않았습니다", description="", color=discord.Colour.red())
                await message.channel.send(embed=embed)
            elif bs.find('tr', {'class': 'search_com_chk'}) == None:
                embed = discord.Embed(title="해당 닉네임을 가진 플레이어가 존재하지 않습니다!", description="", color=discord.Colour.red())
                await message.channel.send(embed=embed)
            else:
                characterRankingLink = bs.find('tr', {'class': 'search_com_chk'}).find('a', {'href': re.compile('\/Common\/Character\/Detail\/[A-Za-z0-9%?=]*')})['href']
                characterUnionRanking = bs2.find('tr', {'class': 'search_com_chk'})
                if characterUnionRanking == None: pass
                else:
                    characterUnionRanking = characterUnionRanking.findAll('td')[2].text
                html = urlopen(mapleLink + characterRankingLink)
                bs = BeautifulSoup(html, 'html.parser')
                personalRankingPageURL = bs.find('a', {'href': re.compile('\/Common\/Character\/Detail\/[A-Za-z0-9%?=]*\/Ranking\?p\=[A-Za-z0-9%?=]*')})['href']
                html = urlopen(mapleLink + personalRankingPageURL)
                bs = BeautifulSoup(html, 'html.parser')
                popularityInfo = bs.find('span',{'class' : 'pop_data'}).text.strip()
                getCharacterImage = bs.find('img',{'src': re.compile('https\:\/\/avatar\.maplestory\.nexon\.com\/Character\/[A-Za-z0-9%?=/]*')})['src']
                infoList = []
                RankingInformation = bs.findAll('dd')
                for inf in RankingInformation:
                    infoList.append(inf.text)
                embed = discord.Embed(title="플레이어 " + playerNickname + " 정보", description=infoList[0] + " | " +infoList[1] + " | " + "Server : " + infoList[2], color=0x5CD1E5)
                embed.add_field(name="아래를 클릭해 해당 플레이어의 정보를 확인하세요!", value = f'[여기를 클릭하세요!]({mapleLink + personalRankingPageURL})', inline=False)
                embed.add_field(name="전체 순위",value=infoList[4], inline=True)
                embed.add_field(name="세계 랭킹", value=infoList[6], inline=True)
                embed.add_field(name="직업 순위", value=infoList[8], inline=True)
                embed.add_field(name="인기 순위", value=infoList[10] + "(" +popularityInfo + ")", inline=True)
                if characterUnionRanking == None:
                    embed.add_field(name="Maple Union", value=infoList[12],inline=True)
                else:
                    embed.add_field(name="Maple Union", value=infoList[12] + "(LV." + characterUnionRanking + ")", inline=True)
                embed.add_field(name="성취 순위", value=infoList[14], inline=True)
                embed.set_thumbnail(url='https://ssl.nx.com/s2/game/maplestory/renewal/common/logo.png')
                embed.set_footer(text='Service provided by Hoplin.',icon_url='https://avatars2.githubusercontent.com/u/45956041?s=460&u=1caf3b112111cbd9849a2b95a88c3a8f3a15ecfa&v=4')
                await message.channel.send("플레이어 " + playerNickname +" 정보", embed=embed)
        except Exception as ex: await message.channel.send(f'에러남.\n{ex}')

    if message.content.startswith(f'{prefix} 틱택토'):
        if isinstance(message.channel, discord.channel.DMChannel): return
        if await is_gaming(message): return
        gaming_list.append(message.author.id)
        try:
            m = await message.channel.send(embed=discord.Embed(description="\\✅를 눌러 게임을 시작하고\n\\❌를 눌러 매칭을 취소하세요!", color=discord.Colour.blue()))
            await m.add_reaction("✅")
            await m.add_reaction("❌")
            def check_emoji(reaction, user):
                if user.id == message.author.id and str(reaction) == "❌": return True
                return (
                    user != message.author
                    and str(reaction.emoji) == "✅"
                    and user.id != client.user.id
                    and reaction.message.id == m.id
                    and not user.id in gaming_list
                    and not user.author.bot
                )
            try:
                reaction, user = await client.wait_for("reaction_add", check=check_emoji, timeout=60.0)
                if str(reaction) == "❌":
                    gaming_list.remove(message.author.id)
                    return await message.channel.send(embed=discord.Embed(description="매칭이 취소되었어요!", color=discord.Colour.blue()))
                elif str(reaction) == "✅":
                    gaming_list.append(user.id)
                    playlist = random.sample([message.author.id, user.id], 2)
                    ox = random.sample(["⭕", "❌"], 2)
                    list_ = [
                        ["1️⃣", "2️⃣", "3️⃣"],
                        ["4️⃣", "5️⃣", "6️⃣"],
                        ["7️⃣", "8️⃣", "9️⃣"]
                    ]
                    now_board = get_playlist(list_)
                    pae = {playlist[0]: ox[0], playlist[1]: ox[1]}
                    aa = list(range(1, 10))
                    p = await message.channel.send(embed=discord.Embed(description="%s\n\n%s - %s\n%s - %s"%(now_board, client.get_user(playlist[0]), ox[0], client.get_user(playlist[1]), ox[1]), color=discord.Colour.blue()))
                    game = True
                    count = 0
                    while game:
                        for c in playlist:
                            count += 1
                            await p.edit(embed=discord.Embed(description="%s님의 턴!\n\n%s\n\n%s - %s\n%s - %s"%(client.get_user(c), now_board, client.get_user(playlist[0]), ox[0], client.get_user(playlist[1]), ox[1]), color=discord.Colour.blue()))
                            try:
                                def check_msg(m):
                                    try:
                                        content = int(m.content)
                                    except: return False
                                    return (
                                        m.channel == message.channel
                                        and m.author.id == c
                                        and content in aa
                                    )
                                
                                msg = await client.wait_for("message", check=check_msg, timeout=30)
                                try: await msg.delete()
                                except: pass
                                aa.remove(int(msg.content))
                                list_ = change_board(pae[c], list_, int(msg.content))
                                now_board = get_playlist(list_)
                                if check_win(list_):
                                    await p.edit(embed=discord.Embed(description="🏆 %s님의 우승!\n\n%s\n\n%s - %s\n%s - %s"%(client.get_user(c), now_board, client.get_user(playlist[0]), ox[0], client.get_user(playlist[1]), ox[1]), color=discord.Colour.blue()))
                                    await message.channel.send(embed=discord.Embed(title="🏆 %s님의 우승!"%(client.get_user(c)), color=discord.Colour.blue()))
                                    game = False
                                    break
                                if check_draw(list_):
                                    await p.edit(embed=discord.Embed(description="무승부!\n\n%s\n\n%s - %s\n%s - %s"%(now_board, client.get_user(playlist[0]), ox[0], client.get_user(playlist[1]), ox[1]), color=discord.Colour.blue()))
                                    await message.channel.send(embed=discord.Embed(title="무승부!", color=discord.Colour.blue()))
                                    game = False
                                    break
                                if count == 5:
                                    await p.delete()
                                    p = await message.channel.send(embed=discord.Embed(description="%s님의 턴!\n\n%s\n\n%s - %s\n%s - %s"%(client.get_user(c), now_board, client.get_user(playlist[0]), ox[0], client.get_user(playlist[1]), ox[1]), color=discord.Colour.blue()))
                            except asyncio.TimeoutError:
                                await message.channel.send("시간이 초과되어 %s님이 패배.."%(client.get_user(c)))
                                game = False
                                break
                            except Exception as ex:
                                await message.channel.send("에러가 나 %s님이 패배..\n에러: %s"%(client.get_user(c),ex))
                                game = False
                                break
                    gaming_list.remove(message.author.id)
                    gaming_list.remove(user.id)
            except asyncio.TimeoutError:
                gaming_list.remove(message.author.id)
                return await message.channel.send("시간이 초과되어 매칭이 취소됬어요!")
            except Exception as ex:
                gaming_list.remove(message.author.id)
                return await message.channel.send("삐--\n%s"%(e))
        except Exception as ex:
            gaming_list.remove(message.author.id)
            await message.channel.send("네. 에러\n%s"%(ex))
    
    if message.content.startswith(f'{prefix} 마크서버'):
        name = message.content[9:]
        if name == "" or name == " ": return await message.channel.send("마크 서버 이름을 안 적었네요.")
        try:
            server = MinecraftServer.lookup(name)
            status = server.status()
        except:
            return await message.channel.send(embed=discord.Embed(description='서버가 오프라인이거나,\n존재하지 않는 서버 주소입니다.', colour=discord.Colour.red()))
        try:
            astr = ''
            if str(type(status.description)) == "<class 'dict'>" and status.description["extra"]:
                des = status.description["extra"]
                for i in des:
                    astr += f"{i['text']}"
            else: astr = status.description
            await message.channel.send(embed=discord.Embed(title = f'`{name}` 서버 상태', description = f'[자세히 보러가기](https://mcsrvstat.us/server/{name})\n\n상태 : 온라인\n접속 유저 : {status.players.online}\n서버 버전 : {status.version}\n서버 속도 (서버 핑) : {status.latency} ms\n\n서버 설명 : \n{astr}', colour=discord.Colour.blue()).set_footer(text=f"이 정보는 사실과 차이가 있을수 있습니다."))
        except Exception as ex:
            await message.channel.send(embed=discord.Embed(title=f'서버가 오프라인이거나 에러가 났습니다.\n{ex}', colour=discord.Colour.red()))

async def is_gaming(ctx):
    if ctx.author.id in gaming_list:
        embed = discord.Embed()
        embed.add_field(name="주의", value="게임을 진행중이셔서 해당 명령어를 실행할 수 없어요.")
        await ctx.channel.send(embed=embed)
        return True

def get_playlist(board):
    now_board = ""
    for c in board:
        for i in c:
            now_board += i
        now_board += "\n"
    return now_board

def zzz(board, m):
    '''지뢰찾기를 생성합니다.'''
    for i in range(7):
        for j in range(7):
            a = random.choice(m)
            board[i][j] = f'||{a}||'
    
    return board

def change_board(ox, board, target):
    if target <= 3:
        board[0][target - 1] = ox
        return board
    elif target <= 6:
        board[1][target - 4] = ox
        return board
    elif target <= 9:
        board[2][target - 7] = ox
        return board

def check_win(board):
    for i in board:
        if i == ["⭕"] * 3 or i == ["❌"] * 3: return True
    
    if (board[0][0] == board[1][0] == board[2][0]
    or board[0][2] == board[1][2] == board[2][2]
    or board[0][0] == board[1][1] == board[2][2]
    or board[0][2] == board[1][1] == board[2][0]
    or board[0][1] == board[1][1] == board[2][1]): return True

    return False

def check_draw(board):
    count = 0
    for i in board:
        count += i.count("⭕")
        count += i.count("❌")
    if count == 9: return True
    else: return False

def text_detect(clientsec, image_file):
    headers = {'Authorization': 'KakaoAK {}'.format(clientsec)}
    files = {'files': image_file}
    resp = requests.post('https://kapi.kakao.com/v1/vision/text/detect', headers=headers, files=files)
    resp.raise_for_status()
    result = resp.json()['result']
    if len(result['boxes']) > 0:
        return result['boxes']
    else:
        return None

def text_recognize(clientsec, image_file, boxes):
    headers = {'Authorization': 'KakaoAK {}'.format(clientsec)}
    data = {'boxes': str(boxes)}
    files = {'files': image_file}
    resp = requests.post('https://kapi.kakao.com/v1/vision/text/recognize', headers=headers, data=data, files=files)
    resp.raise_for_status()
    result = resp.json()['result']
    if len(result['recognition_words']) > 0:
        return result['recognition_words']
    else:
        return None

def earthquake(source):
    """지진과 관련된 함수."""
    source = source.text.strip()
    if source:
        return source
    elif source == "" or source is None: return "정보가 없음. :("

def deleteTags(htmls):
    for a in range(len(htmls)):
        htmls[a] = re.sub('<.+?>', '', str(htmls[a]), 0).strip()
    return htmls

def tierCompare(solorank, flexrank):
    if tierScore[solorank] > tierScore[flexrank]:
        return 0
    elif tierScore[solorank] < tierScore[flexrank]:
        return 1
    else:
        return 2

client.run("BotToken")
